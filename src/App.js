import { MyComponent } from "./MyComponent";
import { useState } from "react";

import "./App.css";
// import // EditOutlined,
// // DeleteOutlined,
// // WindowsOutlined,
// "@ant-design/icons";

let myId = localStorage.getItem("id")
  ? JSON.parse(localStorage.getItem("id"))
  : 0;
//let myId = 0;
function getList() {
  if (localStorage.getItem("list")) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
}

export default function App() {
  const [list, setList] = useState(getList());
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [fruit, setFruit] = useState("Mango");
  const [isCool, setCool] = useState(false);
  const [isSearching, setSearch] = useState("");
  const [insta, setInsta] = useState("");
  const [loading, isLoading] = useState(false);
  // const [isEditing, setIsEditing] = useState(false);
  // const [editID, setEditID] = useState(null);
  //   const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  //   return <section className="section-center">
  // <div className="Actions">

  // </div>

  //   </section>

  // const showAlert = (show = false, type = "", msg = "") => {
  //   setAlert({ show, type, msg });
  // };
  // const clearList = () => {
  //   showAlert(true, "danger", "empty list");
  //   setList([]);
  // };
  const removeItem = (id) => {
    //   showAlert(true, "danger", "item removed");
    let isDel = window.confirm("Are you sure you want to delete!!");
    if (isDel) {
      let arr = list.filter((item) => item.id !== id);
      setList(arr);

      localStorage.setItem("list", JSON.stringify(arr));
    }

    // const editItem = (id) => {
    //   let newEditItem = items.find(()) => {
    //     return elem.id === id
    //   });
    //   console.log(newEditItem);

    //   setIsEditing(id);
    // }

    // const editItem = (id) => {
    //   let isEditing = window;
    //   if (isEditing) {
    //     let arr = list.filter((item) => item.id !== id);
    //     setList(arr);

    //     localStorage.setItem("list", JSON.stringify(arr));
    //   }
    // };
  };

  function submitHandler(e) {
    e.preventDefault();

    let arr;

    isLoading(true);
    fetch(`http://adani.tongo.in:7398/results?insta=${insta}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        isLoading(false);
        list.push({
          id: myId++,
          title: name,
          age: age,
          hobbies: hobbies,
          fruits: fruit,
          isCool: isCool,
          insta: insta,
          instaFollower: data,
          //actions: actions,
        });
      })
      .then(() => {
        arr = [...list];
        setList(arr);
        localStorage.setItem("id", myId);
        localStorage.setItem("list", JSON.stringify(arr));
      });
  }

  return (
    <>
      <div className="parent">
        <form className="search">
          {/* <label htmlFor="search">Search</label> */}
          <input
            type="text"
            id="search"
            name="search"
            value={isSearching}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              const arr = list.filter((item) => item.title === isSearching);
              setList(arr);
              // localStorage.setItem("list", JSON.stringify(arr));
            }}
          >
            SearchBYName
          </button>
          <button
            className="delAll"
            onClick={(e) => {
              e.preventDefault();
              let isDelAll = window.confirm(
                "Are you sure you want to delete everything!!!"
              );
              if (isDelAll) {
                setList([]);
                localStorage.setItem("list", JSON.stringify([]));
              }
            }}
          >
            DELETE
          </button>
        </form>

        <form className="flex " onSubmit={(e) => submitHandler(e)}>
          <div className="first-child">
            <label htmlFor="insta">Insta handle </label>
            <input
              className="insta"
              value={insta}
              id="insta"
              onChange={(e) => setInsta(e.target.value)}
            ></input>
          </div>

          <div className="second-child">
            <label className="name" htmlFor="name">
              Name
            </label>
            <input
              value={name}
              id="name"
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>

          <div className="third-child">
            <label className="age" htmlFor="age">
              Age
            </label>
            <input
              value={age}
              id="age"
              type="number"
              onChange={(e) => setAge(e.target.value)}
            ></input>
          </div>

          <div className="fourth-child">
            <label className="hobbies" htmlFor="hobbies">
              Hobbies
            </label>
            <input
              value={hobbies}
              id="hobbies"
              type="text"
              onChange={(e) => setHobbies(e.target.value)}
            ></input>
          </div>

          <div className="fifth-child">
            <label className="fruits" htmlFor="fruits">
              Choose a fruits:
            </label>
            <select
              className="choose"
              name="fruits"
              id="fruits"
              value={fruit}
              onChange={(e) => setFruit(e.target.value)}
            >
              <option value="Mango">Mango</option>
              <option value="Apple">Apple</option>
              <option value="Orange">Orange</option>
              <option value="Banana">Banana</option>
            </select>
          </div>

          <div className="sixth-child">
            <input
              type="checkbox"
              id="Cooler"
              name="Cooler"
              value={isCool}
              onClick={() => {
                setCool(!isCool);
              }}
            />
            <label className="cooler" htmlFor="Cooler">
              I am Cool
            </label>
          </div>
          <button type="submit" className={insta ? "submit" : "disabled"}>
            Submit
          </button>
        </form>
        {/* {MyComponent.map((curMycomponent)) => { 
          return <MyComponent key={curMycomponent.id} { ...curMycomponent} 
        }
        } */}
      </div>
      <MyComponent
        removeItem={removeItem}
        // editItem={editItem}
        list={list}
        setList={setList}
        loading={loading}
      />
    </>
  );
}
