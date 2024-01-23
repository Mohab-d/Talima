const FilterComponent = (props) => {
  return (
    <select onChange={props.handleFilter} name={props.name} value={props.selectedFilter}>
      <option>All</option>
      {props.array && props.array.map((item, index) => {
        return <option key={index} id={index}>{item.name}</option>
      })}
    </select>
  )
}

export default FilterComponent;