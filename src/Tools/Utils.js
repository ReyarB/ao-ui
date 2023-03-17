
import {useEffect, useState} from "react";

const ValidateEmail = email => {
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return email.length === 0 || email.match(validRegex)
}

const ValidatePassword = pwd => {
  return pwd.length === 0 || pwd.length >= 4
}

const SanitazeInput = input => {
  return input
}

const ValidateRoboCode = (value1, value2, response) => {
  return response.length === 0 || value1 + value2 === +response
}
const GetRandomInt = max => {
  return Math.floor(Math.random() * max);
}

const ValidValidationCode = code => {
  return code.length === 8
}

const ValidResetPwdCode = code => {
  return code.length === 6
}

const ValidateString = input => {
  var validRegex = /^[A-Za-z]+$/;
  return input.length === 0 || input.match(validRegex)
}

const GetImage = path => {
  if (process.env.NODE_ENV === 'development') {
    return path
  }
  else {
    return require(path)
  }
}
const GetColorForCharacterStatus = status => {
  switch(status)
  {
    case 0: //criminal
      return 'criminal-color'
    case 1: //citizen
      return 'citizen-color'
    case 2: //Chaos
      return 'chaos-color'
    case 3: //Army
      return 'army-color'
    case 7: //Admin
      return 'admin-color'
    default: //undefined
      return ''
  }
}

const GetNameForClassId = id => {
  switch(id)
  {
  }
  return 'Warrior'
}

const LoadIni = async filePath => {
  return await fetch(GetRootDirectory() + filePath)
      .then((response) => response.text())
      .then((text) => {
        // Parse the INI file text into an object
        const lines = text.split("\n");
        const configObject = {};
        let currSectionName = ''
        for (let line of lines) {
          if (line.at(0) == '[') {
            currSectionName = line.slice(1, line.length -2)
            configObject[currSectionName] = {}
          }
          else {
            const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
            if (match != null) {
              const key = match[1];
              const value = match[2];
              configObject[currSectionName][key] = value;
            }
          }
        }
        return configObject
      })   
}
const LoadJsonFile = async filePath => {
  return await fetch(GetRootDirectory() + filePath)
      .then((response) => response.text())
      .then((text) => {      
        return JSON.parse(text)
      })
}



export function useSingleAndDoubleClick(
    handleSingleClick,
    handleDoubleClick,
    delay = 250,
    value
) {
  const [click, setClick] = useState(0);
  useEffect((e) => {
    const timer = setTimeout(() => {
      if (click === 1) {
        handleSingleClick(e, value);
      }
      setClick(0);
    }, delay);

    if (click === 2) {
      handleDoubleClick(e, value);
    }

    return () => clearTimeout(timer);

  }, [click, handleSingleClick, handleDoubleClick, delay]);

  return () => setClick(prev => prev + 1);
}



const GetRootDirectory = () => {
  if (process.env.NODE_ENV === 'development') {
    return (`${process.env.PUBLIC_URL}/Recursos/`)
  }
  else {
    return (`${process.env.PUBLIC_URL}/../`)
  }
}
export {ValidateEmail, ValidatePassword, SanitazeInput, GetRandomInt,
        ValidateRoboCode, ValidateString, ValidValidationCode,
        ValidResetPwdCode, GetRootDirectory, LoadIni, GetColorForCharacterStatus,
        GetNameForClassId, LoadJsonFile, GetImage }