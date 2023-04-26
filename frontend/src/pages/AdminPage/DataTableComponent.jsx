import React from 'react'
import DataTable from 'react-data-table-component'

const DataTableComponent = () => {
    const columns =[
        {
            name:"Name",
            selector:row=>row.name
        },
        {
            name:"Email",
            selector:row=>row.email
        },
        {
            name:"Age",
            selector:row=>row.age
        }
    ];
    const data = [
        {
            id:5,
            name:"alwin",
            email:"alwin@123.com",
            age:12
        },
        {
            id:5,
            name:"alwin",
            email:"alwin@123.com",
            age:12
        },        {
            id:5,
            name:"alwin",
            email:"alwin@123.com",
            age:12
        },        {
            id:5,
            name:"alwin",
            email:"alwin@123.com",
            age:12
        },

    ]

  return (
    <div>
        <DataTable columns={columns} data={data}>
        </DataTable>
    </div>
  )
}

export default DataTableComponent