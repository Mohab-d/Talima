import { useEffect, useState } from "react";
import axios from "axios";


const CategoryForm = props => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const allCategories = axios.get('api/category')
      .then((response) => {
        setCategories(response.data.categories)
      })
      .catch((error) => {
      console.error("Talima clien: " + error)
    })
  }, [])

  return (
    <select onChange={props.handleInput} name="taskCategory" value={props.value}>
      <option defaultValue={true} disabled={true}>Select category</option>
      {categories && categories.map((category, index) => {
        return <option key={index} id={category.id}>{category.name}</option>
      })}
    </select>
  )
}

export default CategoryForm;