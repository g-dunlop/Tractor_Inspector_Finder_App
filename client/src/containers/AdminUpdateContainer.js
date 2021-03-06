import React, { useEffect, useState } from "react";
import AdminUpdateInspectorForm from '../components/Admin/AdminUpdateInspectorForm';
import TractorFactorService from "../services.js/TractorFactorServices";
import {useParams, useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import { FloatingLabel } from 'react-bootstrap';
import {FormCheck} from 'react-bootstrap';
import Button from 'react-bootstrap/Button'


const AdminUpdateContainer = () => {

    const { id } = useParams()
    const [inspectorToUpdate, setInspectorToUpdate] = useState(null)
    const [manufacturers, setManufacturers] = useState(null)
    const [mappedManufacturers, setMappedManufacturers] = useState(null)
    const [checkedState, setCheckedState] = useState(null)
    const [tractorsArray, setTractorsArray] = useState(null)

  
    let navigate = useNavigate();

    const getInspector = () => {
        console.log(id)
        TractorFactorService.getInspectorById(id)
        .then(data => setInspectorToUpdate(data))
    } 

    const getTractors = () => {
        TractorFactorService.getAllManufacturers()
        .then(data => setManufacturers(data))
    }

    useEffect(() => {
        getInspector()
        getTractors()
    }, [])

    useEffect(() => {
        if(manufacturers !== null ){
            updateCheckedState()
        }
        
    }, [manufacturers])

    const updateCheckedState = () => {
        let temp = new Array(manufacturers.length).fill(false)
        if (inspectorToUpdate.tractorIds.length > 0){
            for (let i=0; i<inspectorToUpdate.tractorIds.length; i++){
                let index = inspectorToUpdate.tractorIds[i]-1;
                temp[index] = true
        }
        setCheckedState(temp)
        } 
    }

    useEffect(() => {
        if (checkedState !== null){
            mapTractorManufacturers()
        }
    }, [checkedState])

    const mapTractorManufacturers = () => {
        
        const tractorMapping = manufacturers.map((tractor, index) => {
            if (tractor.id === inspectorToUpdate.tractorIds[0]) {
                return  <Form.Check inline className="check-item"><FormCheck.Label htmlFor="manufacturer" name={tractor.manufacturer}>{tractor.manufacturer}</FormCheck.Label> <FormCheck.Input onChange={() => handleCheckboxChange(index)} checked={checkedState[index]} name={tractor.id} id={index} key={index} type="checkbox"  value={tractor.id}></FormCheck.Input></Form.Check>

            } else{
                return  <Form.Check inline className="check-item"><FormCheck.Label htmlFor="manufacturer" name={tractor.manufacturer}>{tractor.manufacturer}</FormCheck.Label> <FormCheck.Input onChange={() => handleCheckboxChange(index)} checked={checkedState[index]} name={tractor.id} id={index} key={index} type="checkbox"  value={tractor.id}></FormCheck.Input></Form.Check>
            }
        })
        
        setMappedManufacturers(tractorMapping)
    }

    useEffect(() => {
        if (checkedState!== null){
            setTractorIDArray()
        }
    }, [checkedState])

    const setTractorIDArray = () =>{
        let temp = []
        for (let i=0; i<checkedState.length; i++){
            if (checkedState[i] === true){
                temp.push(manufacturers[i].id)
            }
        } setTractorsArray(temp)
    }

    const handleCheckboxChange = (position) => {
        console.log(position)
        const updatedCheckedState = checkedState.map((item, index) => {
            if (index === position) {
              return !item;
            } else {
              return item;
            }
          });
    
        setCheckedState(updatedCheckedState);
    }

    const updateInspectorInDb = (inspector) => {
        TractorFactorService.updateInspector(inspector)
        .then(toast.success("updated"))
    }
    

   

    //put

    return(
        <section className="admin-update-container">
            <h3>Update Inspector</h3>
            {inspectorToUpdate !== null ? <AdminUpdateInspectorForm inspectorToUpdate={inspectorToUpdate} tractorsArray={tractorsArray} updateInspectorInDb={updateInspectorInDb} mappedManufacturers={mappedManufacturers} /> : null}
            <Nav.Link href="admin"><Button variant="outline-success" onClick = {() => {navigate("/admin")}}>Back to Admin Page</Button></Nav.Link>

        </section>
        
    )
}
export default AdminUpdateContainer;