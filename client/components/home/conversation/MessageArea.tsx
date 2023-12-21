import { ChangeEvent, KeyboardEvent, useEffect, useRef } from 'react'
import NewChatPage from './NewChatPage'
import { useGlobalState } from '../../../hooks/useGlobalState'
import { Assistant, Thread, ThreadHeader } from '../../../../interfaces'
import * as db from 'firebase/firestore'
import { useGlobalRef } from '../../../hooks/useGlobalRef'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
import { Conversation } from './Conversation'
import { v4 as uuidv4 } from 'uuid'
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs'

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

  async function GenerateCompletion(
    conversation: ChatCompletionMessageParam[],
    assistant: Assistant
  ) {
    return await globalRef.openai.chat.completions.create({
      messages: conversation,
      model: assistant.model,
      stream: false,
      temperature: assistant.temperature,
      max_tokens: assistant.maxTokens,
    })
  }

  function AddMessageToConversation(
    conversation: ChatCompletionMessageParam[],
    role: 'user' | 'system' | 'assistant',
    content: string
  ) {
    conversation.push({
      role,
      content,
    })
  }

  async function CreateNewChatMessage(userMessage: string) {
    const uuid = uuidv4()

    const assistant = globalRef.settings.assistants.find(
      (a) => a.isDefault
    ) as Assistant

    if (assistant == undefined) {
      alert('Default assistant not found. Please try again later')
      throw new Error('Default assistant not found. Please try again later')
    }

    const thread: Thread = {
      id: uuid,
      conversation: [],
      assistant,
    }

    if (assistant.instructions) {
      AddMessageToConversation(
        thread.conversation,
        'system',
        assistant.instructions
      )
    }

    AddMessageToThread(thread, userMessage, true)
    GenerateHeader(thread.id, userMessage)
  }
  async function GenerateHeader(threadID: string, message: string) {
    const assistant = globalRef.settings.assistants.find(
      (a) => a.name === 'Header Generator'
    ) as Assistant

    if (assistant == undefined) {
      alert('Header assistant not found. Please try again later')
      throw new Error('Header assistant not found')
    }

    const conversation: ChatCompletionMessageParam[] = []

    AddMessageToConversation(
      conversation,
      'system',
      assistant.instructions as string
    )
    AddMessageToConversation(conversation, 'user', message)

    console.log(conversation)

    const completion = await GenerateCompletion(conversation, assistant)

    console.log(completion)

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

    if (thread.assistant.instructions != null && firstMessage) {
      AddMessageToConversation(
        thread.conversation,
        'system',
        thread.assistant.instructions
      )
    }

    AddMessageToConversation(thread.conversation, 'user', message)

    const messages = await GenerateCompletion(
      thread.conversation,
      thread.assistant
    )

    AddMessageToConversation(
      thread.conversation,
      'assistant',
      messages.choices[0].message.content as string
    )

    setGlobalState((oldState) => ({
      ...oldState,
      insideNewChat: false,
      currentThread: thread,
    }))

    const threadsDoc = db.doc(
      db.getFirestore(),
      `threads/${user?.uid}/conversations/${thread.id}`
    )

    await db.setDoc(threadsDoc, thread).catch((e) => {
      console.error(e.message)
      alert('Failed to save thread')
    })
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.code === 'Enter' && !event.shiftKey) {
      event.preventDefault()

      const target = event.target as HTMLTextAreaElement
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
    </div>
  )
}
