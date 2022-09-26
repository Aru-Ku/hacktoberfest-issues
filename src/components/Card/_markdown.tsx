import ReactMarkdown from 'react-markdown'

export const RenderMarkdown = (props: {
  markdownText: string
}) => {


  return (
    <ReactMarkdown
      components={{
        img: () => <></> // Do not render images
      }}
    >
      {props.markdownText}
    </ReactMarkdown>
  )
}
