import React, { useEffect } from 'react';
import { array, number, object, string } from 'yup';
import { useStateMachine } from 'little-state-machine';
import { updateOffer } from '../state-machine/yourDetailsAction';
import { IFormOfferSkills } from '../../../types/forms/post-offer-types/IFormOfferSkills';
import { useNavigate } from 'react-router-dom';
import { FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ReactHookFormTextField2 from '../../../common/components/RHookFormTextField2';
import { Button, MenuItem } from '@mui/material';
import { SubmitButtonStyled } from '../../../common/component-styles/SubmitButton';
import { levels } from './select-inputs/levels';
import Template from '../../Template';
import ClearIcon from '@mui/icons-material/Clear';
import { red } from '@mui/material/colors';
import { TemplateTypeChild } from '../../../types/forms/TemplateTypeChild';

const skillsSchema = object({
    name: string().required('this field is required'),
    level: number().required('this field is required'),
});

const formSchema = object({
    skills: array().of(skillsSchema)
});

const Skills = ({ type }: TemplateTypeChild) => {
    const navigate = useNavigate();
    const { actions, state } = useStateMachine({ updateOffer });

    const methods = useForm<IFormOfferSkills>({
        defaultValues: {
            skills: state.yourDetails.skills,
        },
        resolver: yupResolver(formSchema)
    });

    const { control, getValues } = methods;

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'skills'
    });

    const submit: SubmitHandler<IFormOfferSkills> = (data: IFormOfferSkills) => {
        actions.updateOffer({
            ...state.yourDetails,
            skills: data.skills
        });
        navigate(`/${type}/employment`);
    };

    useEffect(() => {
        if (state.yourDetails.skills.length === 0){
            append({ name: state.yourDetails.marker_icon, level: 2 });
        }
    }, []);
    return (
        <Template header={'Skills'}>
            <FormProvider {...methods}>
                <form className='form' onSubmit={methods.handleSubmit(submit)} >
                    {fields.map(( { id }, index) =>
                        <div key={id} className = 'arrays'>
                            <div className='name-level'>
                                <div className='name'>
                                    <ReactHookFormTextField2 label="Skill name" name={`skills.${index}.name`} index={index}/>
                                </div>
                                <div className='level-small'>
                                    <ReactHookFormTextField2 label="Level" name={`skills.${index}.level`} index={index} select={true} defaultValue={getValues(`skills.${index}.level`)} >
                                        {levels.map((item) =>
                                            <MenuItem key={item.label} value={item.label}>{item.label}</MenuItem>
                                        )}
                                    </ReactHookFormTextField2>
                                </div>
                                {fields.length > 1 &&
                                    <div className='delete'>
                                        <ClearIcon  sx={{ color: red[500], fontSize: 32 }} onClick={() => remove(index)} > remove </ClearIcon>
                                    </div>
                                }
                            </div>
                        </div>

                    )}
                    <Button  type="button" onClick={() => append({ name: '', level: 2 }) }> Add one more skill</Button>
                    <div className='row'>
                        <SubmitButtonStyled type="submit" variant="contained" color="primary" sx={{ marginRight: '10px' }} onClick={() => navigate(`/${type}/programing`)}>
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

export default Skills;