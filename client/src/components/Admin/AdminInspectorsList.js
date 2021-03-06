import React, {useState, useEffect} from 'react';
import AdminInspectorItem from './AdminInspectorItem';
import Table from 'react-bootstrap/Table';

const AdminInspectorsList = ({inspectors, updateInspector, handleDeleteButtonClick, handleUpdateButtonClick, isDeleteToast}) => {

    const [mappedInspectors, setMappedInspectors] = useState(null)

    const mapInspectors = () => {
        const mappedArray = inspectors.map((inspector, index) => {
            return <AdminInspectorItem inspector={inspector} key={index} updateInspector={updateInspector} handleDeleteButtonClick={handleDeleteButtonClick} handleUpdateButtonClick={handleUpdateButtonClick} />
        })
        setMappedInspectors(mappedArray)
    }

    useEffect(() => {
        if (inspectors !== null){
         mapInspectors()
        }
    }, [inspectors])

    return (
        <>
            <h3 className="inspectors-header"  id="all" >Inspectors:</h3>
            <div  className="inspector-information">
             {mappedInspectors !== null ? 
                <Table  responsive striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address </th>
                            <th>Phone </th>
                            <th>Email </th>
                            <th>Rating </th>
                            <th>Notes</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mappedInspectors}
                        
                    </tbody>
                </Table>: null}
            </div>
        </>
    )
}

export default AdminInspectorsList;