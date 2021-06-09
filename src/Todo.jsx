// import React, { useEffect, useState } from 'react';
// import image from './images/bag2.png';



// //to get data from local storage.


// const getLocalData = () =>{

//     let localList = localStorage.getItem('Lists');

//     if(localList){

//         return JSON.parse(localStorage.getItem('Lists'));

//     }
//     else{

//         return [];

//     }


// }


// const Todo = () => {

//     const [data,setData] = useState('');
//     const [list,setList] = useState(getLocalData());


//     const addData = () =>{


//         if(!data){

//             alert("Please enter something!!!");

//         }
//         else{

//             setList([...list,data]);
//             setData('');


//         }


//     }

//     const deleteItem = (idd) =>{

//         setList((preVal)=>{

//             return preVal.filter((vall,idx)=>{


//                 return idd!==idx;

//             })


//         })


//     }

//     const delAll = () =>{


//         setList([]);


//     }

//     //set data in local storage when the list changes.

//     useEffect(()=>{

//         localStorage.setItem('Lists', JSON.stringify(list));

//     },[list]);



//     return (
//         <>

//             <div className="main-div">

//                 <div className="child-div">

//                     <figure>

//                         <img src={image} alt="todoLogo" />
//                         <figcaption>Add Your List Here 🖐️</figcaption>

//                     </figure>

//                     <div className="addItems">

//                         <input 
//                         type="text" 
//                         placeholder="✍️ Add Items..." 
//                         value={data}
//                         onChange={(event)=>{
                            
//                             setData(event.target.value);


//                         }}    
//                         />
//                         <i className="fas fa-plus-circle add-btn" 
//                         title="Add Item" 
//                         onClick={addData}
//                         ></i>

//                     </div>

//                     <div className="showItems">

//                        {

//                             list.map((ele,indx) =>{


//                                 return(

//                                     <div className="eachItems" key={indx}>

//                                         <h3>{ele}</h3>
//                                         <i className="fas fa-trash-alt" 
//                                         title="Delete Item"
//                                         onClick={()=>{


//                                             deleteItem(indx);

//                                         }}
//                                         ></i>

//                                     </div>


//                                 );
                                


//                             })

//                        }
                       
                        

                        

//                     </div>


//                     <div className="showItems">


//                         <button className="btn effect04" 
//                         data-sm-link-text="Remove All"
//                         onClick={delAll}
//                         >
//                             <span>CHECK LIST</span>
//                         </button>


//                     </div>


//                 </div>


//             </div>

            
//         </>
//     )
// }

// export default Todo;






//making advance of same version




import React, { useEffect, useState } from 'react';
import image from './images/bag2.png';



//to get data from local storage.


const getLocalData = () =>{

    let localList = localStorage.getItem('Lists');

    if(localList){

        return JSON.parse(localStorage.getItem('Lists'));

    }
    else{

        return [];

    }


}

const Todo = () => {

    const [data,setData] = useState('');
    const [list,setList] = useState(getLocalData());
    const [toggleSub,setToggleSub] = useState(true);
    const [isEditItem,setIsEditItem] = useState(null);

//adding data into hooks usestate


    const addData = () =>{


        if(!data){

            alert("Please enter something!!!");

        }

        else if(data && !toggleSub){

            setList(

                list.map((elem)=>{

                    if(elem.id === isEditItem){


                        return {...elem, name:data};

                    }

                    return elem;


                })


            )

            setToggleSub(true);
            setData('');
            setIsEditItem(null);


        }

        else{

            const allInputData = {id: new Date().getTime().toString(), name:data }
            setList([...list,allInputData]);
            setData('');


        }


    }


//deleting item individually

    const deleteItem = (idd) =>{

        setList((preVal)=>{

            return preVal.filter((vall)=>{


                return idd !== vall.id;

            })


        })


    }



    //editing items.



    const editItem = (idx) =>{

        let newEditItem = list.find((elem)=>{


            return elem.id === idx;


        });

        //console.log(newEditItem);

        setToggleSub(false);
        setData(newEditItem.name);
        setIsEditItem(idx);


    }







    //Removing all items.


    const delAll = () =>{


        setList([]);


    }


//set data in local storage when the list changes.

    useEffect(()=>{

        localStorage.setItem('Lists', JSON.stringify(list));

    },[list]);



    return (
        <>

            <div className="main-div">

                <div className="child-div">

                    <figure>

                        <img src={image} alt="todoLogo" />
                        <figcaption>Add Your List Here 🖐️</figcaption>

                    </figure>

                    <div className="addItems">

                        <input 
                        type="text" 
                        placeholder="✍️ Add Items..." 
                        value={data}
                        onChange={(event)=>{
                            
                            setData(event.target.value);


                        }}    
                        />

                        {

                            toggleSub ? (

                                <i className="fas fa-plus add-btn" 
                                    title="Add Item" 
                                    onClick={addData}
                                ></i>
                            ) : (

                                <i className="fas fa-edit edit-btn" 
                                    title="Update Item" 
                                    onClick={addData}
                                ></i>


                            )


                        }

                       


                    </div>

                    <div className="showItems">

                       {

                            list.map((ele) =>{


                                return(

                                    <div className="eachItems" key={ele.id}>

                                        <h3>{ele.name}</h3>
                                        <div className="todo-btn">

                                            <i className="fas fa-edit" 
                                            title="Edit Item"
                                            onClick={()=>{


                                                editItem(ele.id);

                                            }}
                                            ></i>
                                            <i className="fas fa-trash-alt" 
                                            title="Delete Item"
                                            onClick={()=>{


                                                deleteItem(ele.id);

                                            }}
                                            ></i>


                                        </div>
                                        

                                    </div>


                                );
                                


                            })

                       }
                       
                        

                        

                    </div>


                    <div className="showItems">


                        <button className="btn effect04" 
                        data-sm-link-text="Remove All"
                        onClick={delAll}
                        >
                            <span>CHECK LIST</span>
                        </button>


                    </div>


                </div>


            </div>

            
        </>
    )
}

export default Todo
