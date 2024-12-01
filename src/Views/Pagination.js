import React from "react";

const Pagination = ({Posts_per_page,setCurrentPage,filtered_products}) => {
    const Total_Pages = []
 
    /// I am running the loop to psuh all pages in the  'Total pages'  array /// 
    for (let i=1; i<=Math.ceil(filtered_products.length/Posts_per_page); i++){
        Total_Pages.push(i)
    }

    return(
         <div className="pagination_comp">
            {Total_Pages.map((page_no,index)=>(   /// here every single page is rendering on the button ///
            <button key={index} onClick={()=> setCurrentPage(page_no)}>{page_no}</button>)
            )}
         </div>   
    )
}

export default Pagination;