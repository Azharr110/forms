import React, { useState } from "react";
import DataTable from "react-data-table-component";
import "./App.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const columns = (removeItem) => [
  {
    name: "Id",
    selector: (row) => row.id,
  },
  {
    name: "Title",
    selector: (row) => row.title,
  },
  {
    name: "Insta handle",
    selector: (row) => {
      return (
        <a href={`https://www.instagram.com/${row.insta}`} target="_blank">
          {row.insta}
        </a>
      );
    },
  },
  {
    name: "Age",
    selector: (row) => row.age,
  },
  {
    name: "Hobbies",
    selector: (row) => row.hobbies,
  },
  {
    name: "Fruits",
    selector: (row) => row.fruits,
  },
  {
    name: "isCool",
    selector: (row) => row.isCool.toString(),
  },
  { name: "Followers", selector: (row) => row.instaFollower },

  {
    name: "Actions",
    selector: (row) => row.actions,
    cell: (row) => {
      // const MyComponent = { id };
      return (
        <div className="btn-container">
          <button type="button" className="edit-btn">
            <EditOutlined />
          </button>
          <button
            type="button"
            className="delete-btn"
            onClick={(e) => removeItem(row.id)}
          >
            <DeleteOutlined />
          </button>
        </div>
      );
    },
  },
];
export function MyComponent({ removeItem, list, setList, loading }) {
  console.log(removeItem);
  if (loading) {
    return <h1 className="loading">LOADING...</h1>;
  } else {
    return (
      <>
        <DataTable
          className="trash"
          columns={columns(removeItem)}
          // removeItem={removeItem}
          // onClicked={(row) => {
          //  let isDel = window.confirm("Are you sure you want to delete!!");
          //  if (isDel) {
          //   let arr = list.filter((item) => item.id !== row.id);
          //   setList(arr);

          //   localStorage.setItem("list", JSON.stringify(arr));
          // }
          // }}
          data={list}
        />
      </>
    );
  }
}
