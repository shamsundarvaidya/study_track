const mongoose = require("mongoose");
const MONGO_URL = `mongodb+srv://sham:sham560078@cluster0.ckcq6u0.mongodb.net/user?retryWrites=true&w=majority`
const Subject = require("./Models/SubjectModel");
const subjectData = {
    subject: "Software Engineering",
    topics: [
      {
        topic: "Introduction to Programming",
        progress: [
          {
            date: new Date(),
            duration: 120, // minutes
            subTopics: ["Variables", "Data Types", "Control Flow"],
          },
          {
            date: new Date(),
            duration: 120, // minutes
            subTopics: ["Variables", "Data Types", "Control Flow"],
          },
        ],
      },
    ],
  };
  
  
  async function createSubject(subjectData) {
    const newSubject = new Subject(subjectData);

    try {
      const savedSubject = await newSubject.save();
      console.log(savedSubject);
    } catch (err) {
      throw new Error('Error creating subject:', err.message);
    }

  }
  

  

async function  createsubjecttest(){
    mongoose.connect(MONGO_URL,{})
    .then(() => {
        console.log('Conected to DB');
        createSubject(subjectData).then(()=>{

            console.log("closing connection")
            mongoose.disconnect()
        });

    })
    .catch((err) => {
        console.error(`Error connecting to DB ${err}`)
    })

}

async function getAllSubjects() {
    try {
      const subjects = await Subject.find();
      console.log(subjects);
    } catch (err) {
      throw new Error('Error getting subjects:', err.message);
    }
  }

async function  readsubjecttest(){
    mongoose.connect(MONGO_URL,{})
    .then(() => {
        console.log('Conected to DB');
        getAllSubjects().then(()=>{
            console.log("closing connection")
            mongoose.disconnect()
        });

    })
    .catch((err) => {
        console.error(`Error connecting to DB ${err}`)
    })

}

createsubjecttest()
//readsubjecttest()