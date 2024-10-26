import React from "react";
//import TaskContext from "./Context/TaskContext";

const About = () => {

  // const a =  useContext(TaskContext);
  // useEffect(() => {
  //   a.update();
  //   //eslint-disable-next-line
  // }, []) // to disable the error of [] in this line above comment is written
  
  return (
    <div>
      <ul>
        <li>This is Task Managet app.</li>
        <li>You can add you daily life tasks.</li>
        <li>You can access it from anywhere and you need only to have a device and internet connection</li>
        </ul>
        <big>All copyrights reserve to the FSD<sup>SG</sup></big> {/* {a.state.name} and he is in class {a.state.class} */}
    </div>
  )
}

export default About;
