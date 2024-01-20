const Filter = (props) => {
  return (
    <select>
      {props.array && props.array.map((item, index) => {
        return <option key={index} id={index}>{item}</option>
      })}
    </select>
  )
}

export default Filter;