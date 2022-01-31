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
import { TemplateTypeChild } from '../../../types/forms/TemplateTypeChild';
import { SendOfferType } from '../../../enums/send-offer-type';

const projectSchema = object({
    project_name: string().required('this field is required'),
    description: string().required('this field is required'),
});

const formSchema = object({
    project: array().of(projectSchema)
});

const Projects = ({ type }: TemplateTypeChild) => {
    const navigate = useNavigate();

    const { actions, state } = useStateMachine({ updateOffer });

    const methods = useForm<IFormOfferProject>({
        defaultValues:{
            project: state.yourDetails.project,
        },
        resolver: yupResolver(formSchema)
    });

    const { control } = methods;

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'project',
    });

    const submit: SubmitHandler<IFormOfferProject> = (data: IFormOfferProject) => {
        if ( data.project?.length === 0) {
            data.project = null;
        }
        actions.updateOffer({
            ...state.yourDetails,
            project: data.project
        });
        console.log(state.yourDetails);
        navigate(`/${type}/programing`);
    };

    useEffect(() => {
        if ( type === SendOfferType.POST ){
            append({ project_name: '', description:'' });
        }
    }, []);

    return (
        <Template header={'Projects'}>
            <FormProvider {...methods}>
                <form className='form' onSubmit={methods.handleSubmit(submit)} >
                    {fields.map(({ id },  index) =>
                        <div key={id} className = 'arrays'>
                            <h4>
                                Projects {`${index + 1}`}
                            </h4>
                            <ReactHookFormTextField2 label="Project name" name={`project.${index}.project_name`} index={index} />
                            <ReactHookFormTextField2 label="Project description" name={`project.${index}.description`} index={index}  rows={4}  />
                            <Button onClick={() => remove(index)} > remove </Button>
                        </div>
                    )}
                    <Button  type="button" onClick={() => append({ project_name: '', description:'' }) }> Add one more project</Button>
                    <div className='row'>
                        <SubmitButtonStyled type="submit" variant="contained" color="primary" sx={{ marginRight: '10px' }} onClick={() => navigate(`/${type}/experience`)}>
                            Previous
                        </SubmitButtonStyled>
                        <SubmitButtonStyled type="submit" variant="contained" color="primary" sx={{ marginLeft: '10px' }}>
                            Next
                        </SubmitButtonStyled>
                    </div>
                </form>
            </FormProvider>
        </Template>
    );
};

export default Projects;