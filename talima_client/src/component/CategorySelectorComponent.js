const CategorySelectorComponent = props => {

  return (
    <select onChange={props.handleInput} name={props.name} value={props.value}>
      {props.categories && props.categories.map((category, index) => {
        return <option key={index} id={category.id}>{category.name}</option>
      })}
    </select>
  )
}

export default CategorySelectorComponent;