var fs = require("fs");

var students=[];

exports.prep = ()=>{
   return new Promise((resolve, reject)=>{
        fs.readFile("./students.json", (err, data)=>{
            if (err) {reject("unable to read file.");}
            students = JSON.parse(data);
            resolve("File read success.");
        }); 
   });
};


//CPA
exports.cpa = ()=>{
    return new Promise((resolve, reject)=>{
       let results = students.filter(student => student.program == "CPA");
       (results.length == 0)? reject("No CPA students."):resolve(results);
    });
}


//All Students
exports.allStudents =()=>{
    return new Promise((resolve, reject)=>{
        if (students.length > 0){
            resolve(students);
        } else reject("No students.");
    })
}


//Add Student
exports.addStudent= (stud)=>{
    return new Promise((resolve, reject)=>{
        stud.studId = students.length+1;
        students.push(stud);
        resolve();
    });

}

//high GPA
exports.highGPA = ()=>{
    return new Promise((resolve, reject)=>{
        let high = 0;
        let highStudent;
        for (let i=0; i<students.length; i++){
            if (students[i].gpa > high){
                high = students[i].gpa;
                highStudent = students[i];
            }
        }
        (highStudent) ? resolve(highStudent): reject("Failed finding student with highest GPA");
    }); 
};



