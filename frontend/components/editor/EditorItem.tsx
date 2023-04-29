import React from "react"
import { Controlled as Editor } from "react-codemirror2"

import "codemirror/lib/codemirror.css"
import "codemirror/theme/material.css"
import "codemirror/mode/xml/xml"
import "codemirror/mode/javascript/javascript"
import "codemirror/mode/css/css"

interface Props {}

export const EditorItem = ({}: Props) => {
  return (
    <div>
      Editor Item
      {/* <Editor
        options={{
          mode: "xml",
          theme: "material",
          lineNumbers: true,
        }}
      /> */}
    </div>
  )
}
