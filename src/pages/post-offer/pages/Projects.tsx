import React, { useEffect } from 'react';
import { array, object, string } from 'yup';
import { IFormOfferProject } from '../../../types/forms/post-offer-types/IFormOfferProject';
import { FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useStateMachine } from 'little-state-machine';
import { updateOffer } from '../state-machine/yourDetailsAction';
import { yupResolver } from '@hookform/resolvers/yup';
import ReactHookFormTextField2 from '../../../common/components/RHookFormTextField2';
import { Button } from '@mui/material';
import { SubmitButtonStyled } from '../../../common/component-styles/SubmitButton';
import Template from '../../Template';

const projectSchema = object({
    project_name: string().required('this field is required'),
    description: string().required('this field is required'),
});

const formSchema = object({
    projects: array().of(projectSchema)
});


const Projects = () => {
    const navigate = useNavigate();

    const { actions, state } = useStateMachine({ updateOffer });

    const methods = useForm<IFormOfferProject>({
        resolver: yupResolver(formSchema)
    });

    const { control } = methods

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'projects',
    });

    const submit: SubmitHandler<IFormOfferProject> = (data: IFormOfferProject) => {
        if ( data.projects?.length === 0) {
            data.projects = null;
        }
        actions.updateOffer({
            ...state.yourDetails,
            projects: data.projects
        })
        console.log(state.yourDetails);
        navigate('/postoffer/programing')
    };

    useEffect(() => {
        append({ project_name: '', description:'' });
    },[])

    return (
        <Template header={'Projects'}>
            <FormProvider {...methods}>
                <form className='form' onSubmit={methods.handleSubmit(submit)} >
                    {fields.map(({ id}, index) =>
                        <div key={id} className = 'Experience'>
                            <h4>
                                Projects {`${index + 1}`}
                            </h4>
                            <ReactHookFormTextField2 label="Project name" name={`projects.${index}.project_name`} index={index}/>
                            <ReactHookFormTextField2 label="Project description" name={`projects.${index}.description`} index={index}  rows={4} />
                            <Button onClick={() => remove(index)} > remove </Button>
                        </div>
                    )}
                    <Button  type="button" onClick={() => append({ project_name: '', description:'' }) }> Add one more project</Button>
                    <SubmitButtonStyled type="submit" variant="contained" color="primary">
                        Next
                    </SubmitButtonStyled>
                </form>
            </FormProvider>
        </Template>
    );
};

export default Projects;