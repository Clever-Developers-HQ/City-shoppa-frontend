import { useState } from 'react';
import dynamic from 'next/dynamic';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// Dynamically import the Editor component
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((module) => module.Editor),
  { ssr: false }
);

const MyEditor = () => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );

  const onEditorStateChange = (state: EditorState) => {
    setEditorState(state);
  };

  return (
    <div>
      <Editor
        editorState : any ={editorState}
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
};

export default MyEditor;

