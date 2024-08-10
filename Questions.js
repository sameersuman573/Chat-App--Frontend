
// 1. what is the use of Browser Router
// 2.what is lazy loading
// 3. diff between callback and hiigher order function
// 4 Why do we use arrow function instead of Simple function

 
// 5.Actual use of useRef hook
// Controlled Re-renders: When a value needs to update the UI, you should use state. However, if you want to track something in the background (like a previous value) without causing a re-render, useRef is perfect for that.


// 6.Diff between useMemo and useRef
// Recalculation vs. Persistence: useMemo is about recalculating a value only when dependencies change, whereas useRef is about persisting a value across renders without recalculating or causing a re-render.

// Non-Triggering: Updating a useRef value does not trigger a re-render, which is exactly what we need when tracking previous state values or other mutable values that should not cause a re-render. useMemo recalculates the value based on dependencies and can trigger re-renders if those dependencies change.


// 7.diff bewteen memo and usememeo hook

// memo: Used for memoizing functional components.

// useMemo: Used for memoizing values or results of computations within functional components.

// 8. what doe e.prevent default does
// When a form is submitted, it usually reloads the page. Using e.preventDefault() prevents this default behavior, allowing you to handle the form submission with JavaScript instead.

// 9. what does thsi hook does useSearchParams
// It provides a function to update the query parameter and as soon as the parameter changes it causes a re render of the component with the new parameter is the url

// 10 . what is the use of Template Literal `${url}?width=${width}`;
// It provides an easier way to concatenate strings and variables in JavaScript. It allows you to embed expressions inside a string literal, denoted by the ${} syntax.
// if you would not use this then you will have to use + operator to concatenate the strings and variables

// 11 what is dom
// dom basically represent the html structure of connected nodes and elements in the browser 
// in vanilla js  we use the document.getelementbyid to get the element from the dom and then we can manipulate the element using the js
// In moder react we donot use getelement by id instead we use the ref hook to get the element and then we can manipulate the element using the ref hook


// 12 what is fragment 
// A fragment helps in returning many componenets with having a parent div or multiple wrappers
// it improves performance by not adding extra nodes to the Dom






// 13. always keep icons absolute and it sparent componenet relative
// 14. what is rem

// 15 What does map push pop  filter foreach returns  
// map returns a new array from the call callback function applied to process the data
// pop removes the last eleemnt from the array and then returns the removed element 
// push returns the length of teh array after it has added the new element in the array 
// filter Value: A new array with the elements that pass the test. If no elements pass the test, an empty array is returned.
// foreach it runs for the each array object but doenot returns anything

// what is a call back function
dashboarddata.map((i) => {
    return {
        ...i , 
        id:i._id,
        avatar: transformImage(i.avatar, 50),

    }
})


// This is what we want 
// (i) => {
//     return {
//       id: i._id,
//       ...i,
//       avatar: transformImage(i.avatar, 50),
//     };
// }

    // Parameter i: Represents each element in the dashboarddata.users array.


// in Map we have used the callback back function to process each user object and returns a new object
  



//16.  what is fallback 

// 17. sending friend request full logic revise




// 10  
// const config = {
//     withCredentials: true,
//     headers: {
//       "Content-Type": "application/json",
//     },
//   }; what does this do

//     withCredentials: true - This is used to include cookies in the request . This is Important if our backend uses cookies for the authentication purposes and it needs to be sent along with the request to authenticate and identify the user

//   "Content-Type": "application/json" - This is used to indicate that requets body will be in json format to expect the json data

// 11.  importance of acessToken and refresh token

// 12. what is the use of this `{url}?width=${width}`
// It allows you to dynamically fetch the values when key is not known at runtime or we get the data at runtime
// It makes the object creation straightforward and easy to read
// 
 

// 13. what does map returns
// map return iterator it doesnot return array it need to be converted


// 14 what is the usecase of Useref hook
// as in vanilla js we use to write keywords like eventListner which were used to interact with directly with the DOm element In the same way the UseRef Hook will be used to interact with the DOm element in the ES6 module
// It is used to hold values that doesnot re renders and that can persist without causing rerender




// 15         socket.to(chatId).emit(TESTING_MESSAGE, message);
//     socket.in(chatId).emit(START_TYPING, chatId);
//     what is the difference between to andin


// 16. why rtk query is used its adavantages
// 1 . it provides automatically caching of data limiting unnecessary network requests
// 2. it supports automatic refecthing of data when the data is updated 
// 3. it is integrated with the redux store so that the data fetched is directly availaible in redux store
// 4. Rtk query provide tags which can be used to invalidate the data when the data is upadted 
// 5. It provide storongg typesupport in Typescript

// 17. what is mutation and query in rtk query
// mutation is used for craeting upadting or deleting the data
// query is used for fetching the data from the server

// 18. what is useContext
// Usecontext Provides us two values
// 1. First its create a context and then provides a provider and consumer
// 2. It provides a golbal state to the component tree so that values can be accessed from anywhere




























