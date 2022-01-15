import React, { useEffect } from 'react';
import { array, object, string } from 'yup';
import { useStateMachine } from 'little-state-machine';
import { updateOffer } from '../state-machine/yourDetailsAction';
import { useNavigate } from 'react-router-dom';
import { FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ReactHookFormTextField2 from '../../../common/components/RHookFormTextField2';
import { Button, MenuItem } from '@mui/material';
import { SubmitButtonStyled } from '../../../common/component-styles/SubmitButton';
import { RHookFormSelect } from '../../../common/components/RHookFormSelect';
import { programingLanguageIconArray } from '../../../common/components/programingLanguageArray';
import { englishSkillInput } from './select-inputs/english-skill-input';
import { experienceLevelInput } from './select-inputs/expierience-level-input';
import Template from '../../Template';
import { IFormOfferPrograming } from '../../../types/forms/post-offer-types/IFormOfferPrograming';
import ClearIcon from '@mui/icons-material/Clear';
import { red } from '@mui/material/colors';


const skillsSchema = object({
    name: string().required('This field is required'),
    level: string().required('This field is required'),
});

const formSchema = object({
    marker_icon: string().required(),
    experience_level: string().required(),
    language: array().of(skillsSchema)
});

const Programing = () => {
    const navigate = useNavigate();
    const { actions, state } = useStateMachine({ updateOffer });

    const methods = useForm<IFormOfferPrograming>({
        resolver: yupResolver(formSchema)
    });

    const { control } = methods;

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'language'
    });

    const submit: SubmitHandler<IFormOfferPrograming> = (data: IFormOfferPrograming) => {
        actions.updateOffer({
            ...state.yourDetails,
            marker_icon: data.marker_icon,
            experience_level: data.experience_level,
            language: data.language
        });
        navigate('/postoffer/skills');
    };

    useEffect( () => {
        append({ name: 'English', level: '' });
    }, []);

    return (
        <Template header={'Programing'}>
            <FormProvider {...methods}>
                <form className='form' onSubmit={methods.handleSubmit(submit)} >
                    <div className='row'>
                        <div className='main-tech'>
                            <RHookFormSelect
                                label='Main technology'
                                name='marker_icon'
                                defaultValue='java'>
                                {programingLanguageIconArray.map((item) =>
                                    <MenuItem
                                        key={item.name}
                                        value={item.value}
                                    >
                                        <div className="autocomplete-row">
                                            <div className="circle">
                                                {item.icon}
                                            </div>
                                            <div className="tech-name">
                                                {item.name}
                                            </div>
                                        </div>
                                    </MenuItem>
                                )}
                            </RHookFormSelect>
                        </div>
                        <RHookFormSelect
                            label='Experience'
                            name='experience_level'
                            defaultValue='mid'>
                            {experienceLevelInput.map((item) =>
                                <MenuItem key={item.label} value={item.value}>{item.label}</MenuItem>
                            )}
                        </RHookFormSelect>

                    </div>
                    <div className='form-header-content'>
                        <h2 className="form-header">
                            Languages
                        </h2>
                    </div>
                    {fields.map(({ id }, index) =>
                        <div key={id} className = 'arrays'>
                            <div className='name-level'>
                                <div className='name-small'>
                                    <ReactHookFormTextField2 label="Language" name={`language.${index}.name`} index={index} />
                                </div>
                                <div className='level-big'>
                                    <ReactHookFormTextField2 label="Level" name={`language.${index}.level`} index={index} select={true} >
                                        {englishSkillInput.map((item) =>
                                            <MenuItem key={item.label} value={item.value}>{item.label}</MenuItem>
                                        )}
                                    </ReactHookFormTextField2>
                                </div>

                                <div className="delete" >
                                    <ClearIcon  sx={{ color: red[500], fontSize: 32 }} onClick={() => remove(index)} > remove </ClearIcon>
                                </div>

                            </div>
                        </div>
                    )}
                    <Button  type="button" onClick={() => append({ name: '', level: 'A2' }) }> Add one more language</Button>
                    <SubmitButtonStyled type="submit" variant="contained" color="primary">
                        Next
                    </SubmitButtonStyled>
                </form>
            </FormProvider>
        </Template>
    );
};

export default Programing;