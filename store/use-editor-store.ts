import {create} from 'zustand'
import { type Editor } from '@tiptap/react'

interface EditorState {
    editor: Editor | null
    editorKey: number
    setEditor: (editor: Editor|null) => void
}

export const useEditorStore = create<EditorState>((set) => ({
    editor: null,
    editorKey: 0,
    setEditor: (editor) => set((state) => ({ editor, editorKey: state.editorKey + 1 }))
}))