const CustomeTextArea = (props: any) => {

return <>
        <textarea
          className="bg-gray-900 text-cyan-600 w-full rounded-md p-1"
          placeholder="Text"
          value={props.value}
          onChange={(e) => {
            props.onChange(e)
          }}
        ></textarea>
</>
}

export default CustomeTextArea;
