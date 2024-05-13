const CustomeInput = (props: any) => {
  return <>
  <input
    className="bg-gray-900 text-cyan-600 w-full rounded-md p-1"
    placeholder="Title"
    value={props.value}
    onChange={(e) => {
      props.onChange(e);
    }}
  ></input>
  </>
}

export default CustomeInput;
