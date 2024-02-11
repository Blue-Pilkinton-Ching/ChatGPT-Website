import { ChangeEvent, KeyboardEvent, useEffect, useRef } from 'react'
import NewChatPage from './NewChatPage'
import { useGlobalState } from '../../../hooks/useGlobalState'
import {
  Assistant,
  GeminiMessage,
  Thread,
  ThreadHeader,
} from '../../../../interfaces'
import * as db from 'firebase/firestore'
import { useGlobalRef } from '../../../hooks/useGlobalRef'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
import { Conversation } from './Conversation'
import { v4 as uuidv4 } from 'uuid'
import {
  ChatCompletion,
  ChatCompletionChunk,
  ChatCompletionMessageParam,
} from 'openai/resources/index.mjs'
import { Stream } from 'openai/streaming.mjs'

export function MessageArea() {
  const { globalState, setGlobalState } = useGlobalState()
  const [user] = useAuthState(getAuth())
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const globalRef = useGlobalRef()

  useEffect(() => {
    if (textAreaRef.current) {
      ChangeTextAreaHeight(textAreaRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textAreaRef.current])

  function ChangeTextAreaHeight(target: HTMLTextAreaElement) {
    target.style.height = 'auto'
    target.style.height = Math.min(target.scrollHeight - 30, 150) + 'px'

    setGlobalState((oldState) => ({
      ...oldState,
      messageTextAreaHeight: target.style.height,
    }))
  }

  async function GenerateOpenAICompletion(
    conversation: ChatCompletionMessageParam[],
    assistant: Assistant,
    stream: boolean
  ) {
    const complection = globalRef.openai.chat.completions.create({
      messages: conversation,
      model: assistant.model,
      stream,
      temperature: assistant.temperature,
      max_tokens: assistant.maxTokens,
    })
    return complection
  }

  function AddMessageToOpenAIConversation(
    conversation: ChatCompletionMessageParam[],
    role: 'user' | 'system' | 'assistant',
    content: string
  ) {
    conversation.push({
      role,
      content,
    })
  }

  function AddMessageToGeminiConversation(
    conversation: GeminiMessage[],
    role: string,
    content: string
  ) {
    conversation.push({
      role,
      parts: content,
    })
  }

  async function CreateNewChatMessage(userMessage: string) {
    const uuid = uuidv4()

    const assistant = globalRef.assistant as Assistant

    const thread: Thread = {
      id: uuid,
      conversation: [],
      assistant,
    }

    if (assistant.instructions) {
      if (thread.assistant.id === 'gemini-pro') {
        AddMessageToGeminiConversation(
          thread.conversation as GeminiMessage[],
          'system',
          assistant.instructions
        )
      } else {
        AddMessageToOpenAIConversation(
          thread.conversation as ChatCompletionMessageParam[],
          'system',
          assistant.instructions
        )
      }
    }

    AddMessageToThread(thread, userMessage, true)
    GenerateHeader(thread.id, userMessage)
  }
  async function GenerateHeader(threadID: string, message: string) {
    const assistant = globalRef.assistants.find(
      (a) => a.name === 'Header Generator'
    ) as Assistant

    if (assistant == undefined) {
      alert('Header assistant not found. Please try again later')
      throw new Error('Header assistant not found')
    }

    const conversation: ChatCompletionMessageParam[] = []

    AddMessageToOpenAIConversation(
      conversation,
      'system',
      assistant.instructions as string
    )
    AddMessageToOpenAIConversation(conversation, 'user', message)

    const completion = (await GenerateOpenAICompletion(
      conversation,
      assistant,
      false
    )) as ChatCompletion

    const header: ThreadHeader = {
      lastEdited: db.Timestamp.now().toMillis(),
      name: completion.choices[0].message.content as string,
      threadID,
    }

    const threadsHeaderDoc = db.doc(
      db.getFirestore(),
      `threads/${user?.uid}/headers/${threadID}`
    )

    await db.setDoc(threadsHeaderDoc, header).catch((e) => {
      console.error(e.message)
      alert('Failed to save thread')
    })

    setGlobalState((oldState) => ({
      ...oldState,
      threadHeaders: [header, ...oldState.threadHeaders],
    }))
  }

  async function AddMessageToThread(
    thread: Thread,
    message: string,
    firstMessage: boolean
  ) {
    setGlobalState((oldState) => ({
      ...oldState,
      insideNewChat: false,
      currentThread: thread,
    }))

    if (thread.assistant.id === 'gemini-pro') {
      const geminiConversation = thread.conversation as GeminiMessage[]

      const model = globalRef.googleai.getGenerativeModel({
        model: thread.assistant.model,
      })

      const chat = model.startChat({ history: geminiConversation })

      AddMessageToGeminiConversation(geminiConversation, 'user', message)
      AddMessageToGeminiConversation(geminiConversation, 'model', '')

      const result = await chat.sendMessageStream(message)

      for await (const chunk of result.stream) {
        const chunkText = chunk.text()

        geminiConversation[thread.conversation.length - 1].parts += chunkText

        thread.conversation = geminiConversation

        setGlobalState((oldState) => ({
          ...oldState,
          insideNewChat: false,
          currentThread: thread,
        }))
      }
    } else {
      const openAIConversation =
        thread.conversation as ChatCompletionMessageParam[]

      if (thread.assistant.instructions != null && firstMessage) {
        AddMessageToOpenAIConversation(
          openAIConversation,
          'system',
          thread.assistant.instructions
        )
      }

      AddMessageToOpenAIConversation(openAIConversation, 'user', message)
      AddMessageToOpenAIConversation(openAIConversation, 'assistant', '')

      const messages = GenerateOpenAICompletion(
        openAIConversation,
        thread.assistant,
        true
      ) as Promise<Stream<ChatCompletionChunk>>

      for await (const chunk of await messages) {
        const content = openAIConversation[thread.conversation.length - 1]
          .content as string

        const newContent = (chunk.choices[0].delta.content as string)
          ? content.concat(chunk.choices[0].delta.content as string)
          : content

        openAIConversation[thread.conversation.length - 1].content = newContent

        setGlobalState((oldState) => ({
          ...oldState,
          insideNewChat: false,
          currentThread: thread,
        }))
      }
    }

    const threadsDoc = db.doc(
      db.getFirestore(),
      `threads/${user?.uid}/conversations/${thread.id}`
    )

    await db.setDoc(threadsDoc, thread).catch((e) => {
      console.error(e.message)
      alert('Failed to save thread')
    })

    console.log(thread)
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.code === 'Enter' && !event.shiftKey) {
      event.preventDefault()

      SendMessage()
    }
  }

  function SendMessage() {
    const target = textAreaRef.current as HTMLTextAreaElement

    if (target.value) {
      const message = target.value
      target.value = ''

      ChangeTextAreaHeight(target)

      if (globalState.insideNewChat) {
        CreateNewChatMessage(message)
      } else {
        AddMessageToThread(globalState.currentThread as Thread, message, false)
      }
    }
  }

  return (
    <div className="message-area">
      {globalState.insideNewChat ? <NewChatPage /> : <Conversation />}
      <div className="text-area-container">
        <textarea
          ref={textAreaRef}
          onKeyDown={onKeyDown}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
            ChangeTextAreaHeight(event.target)
          }
          className="message-text-field text"
          name="message-text-field"
          placeholder="Message GPT..."
          rows={1}
        ></textarea>
        <button onClick={SendMessage} className="send-text-button button">
          <img src="/images/send.svg" alt="send-icon" className="send-text" />
        </button>
      </div>
    </div>
  )
}
