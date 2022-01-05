import React from 'react';
import { array, number, object, string } from 'yup';
import { useStateMachine } from 'little-state-machine';
import { updateOffer } from '../state-machine/yourDetailsAction';
import { IFormOfferSkills } from '../../../types/forms/post-offer-types/IFormOfferSkills';
import { useNavigate } from 'react-router-dom';
import { FormProvider, SubmitHandler, useFieldArray, useForm, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ReactHookFormTextField2 from '../../../common/components/RHookFormTextField2';
import { Button, MenuItem } from '@mui/material';
import { SubmitButtonStyled } from '../../../common/component-styles/SubmitButton';
import { levels } from './select-inputs/levels';
import Template from '../../Template';
import ClearIcon from '@mui/icons-material/Clear';
import { red } from '@mui/material/colors';

const skillsSchema = object({
    name: string().required('this field is required'),
    level: number().required('this field is required'),
})

const formSchema = object({
    skills: array().of(skillsSchema)
})

const Skills = () => {
    const navigate = useNavigate();
    const { actions, state } = useStateMachine({ updateOffer});

    let methods: UseFormReturn<IFormOfferSkills>;
    methods = useForm<IFormOfferSkills>({
        defaultValues: {
            skills: [
                {
                    name: state.yourDetails.marker_icon,
                    level: 1
                }
            ],
        },
        resolver: yupResolver(formSchema)
    });

    const { control, getValues } = methods

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'skills'
    })

    const submit: SubmitHandler<IFormOfferSkills> = (data: IFormOfferSkills) => {
        actions.updateOffer({
            ...state.yourDetails,
            skills: data.skills
        });
        navigate('/postoffer/employment');
    }

    return (
        <Template header={'Skills'}>
            <FormProvider {...methods}>
                <form className='form' onSubmit={methods.handleSubmit(submit)} >
                    {fields.map(({ id}, index) =>
                        <div key={id} className = 'education'>
                            <div className='name-level'>
                                <div className='name'>
                                    <ReactHookFormTextField2 label="Skill name" name={`skills.${index}.name`} index={index}/>
                                </div>
                                <div className='level'>
                                    <ReactHookFormTextField2 label="Level" name={`skills.${index}.level`} index={index} defaultValue={getValues(`skills.${index}.level`)} select={true}>
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
                    <SubmitButtonStyled type="submit" variant="contained" color="primary">
                        Next
                    </SubmitButtonStyled>
                </form>
            </FormProvider>
        </Template>
    );
};

export default Skills;