import React from "react";
import "./Home.css";
import cat from "./images/cat.png";

const Home = ({ isAuth }) => {
  const contentsList = [
    {
      title: "content",
      list: [
        { name: "ALL", color: "rgb(133, 163, 217)" },
        { name: "HTML", color: "rgb(40, 163, 217)" },
        { name: "Python", color: "rgb(48, 111, 160)" },
        { name: "Java", color: "rgb(235, 138, 35)" },
        { name: "Nvim", color: "rgb(90, 167, 61)" },
        { name: "Linux", color: "rgb(15, 15, 15)" },
        { name: "Tmux", color: "rgb(38, 54, 71)" },
        { name: "Books", color: "rgb(40, 163, 0)" },
      ],
    },
    {
      title: "portfolio",
      list: [{ name: "Book", color: "rgb(40, 163, 0)" }],
    },
  ];

  const blogs = [
    { title: "変数", text: "aaaaaaaaaaaaaaaa", tag: "python", key: "1" },
    { title: "変数", text: "aaaaaaaaaaaaaaaa", tag: "python", key: "2" },
    { title: "変数", text: "aaaaaaaaaaaaaaaa", tag: "python", key: "3" },
    { title: "変数", text: "aaaaaaaaaaaaaaaa", tag: "python", key: "4" },
    { title: "変数", text: "aaaaaaaaaaaaaaaa", tag: "python", key: "5" },
  ];

  return (
    <div className="main">
      <div className="top-wrapper">
        <img src={cat} alt="トップイメージ" />
        {/* <div className="top-information">
          <div className="top-inner">
            <h1>New</h1>
            {blogs.map((blog) => {
              return (
                <ul key={blog.key}>
                  <li>
                    #{blog.tag}, {blog.title}, {blog.text},
                  </li>
                </ul>
              );
            })}
          </div>
        </div> */}
      </div>
      <div className="content">
        {contentsList.map((contents) => (
          <div key={contents.title}>
            <h2 className="content-title">{contents.title}</h2>
            <div className="content-inner">
              <div className="icons">
                {contents.list.map((cont) => (
                  <div key={cont.name}>
                    <a href={`/knowledge?tag=${cont.name}`}>
                      <div
                        className="icon"
                        style={{ backgroundColor: cont.color }}
                      >
                        <p>{cont.name}</p>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
