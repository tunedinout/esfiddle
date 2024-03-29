import React, { useEffect } from 'react'
import { MdDelete } from 'react-icons/md'
import { RiJavascriptFill } from 'react-icons/ri'
import { ContentEditableFileName, DeleteButtonContainer } from './styles'
import { useCustomListItemWrapper } from './hooks'
import { ListItem, styled } from '@mui/material'

export default function CustomListItemWrapper({
    file,
    renameHandler,
    deleteHandler,
    selectFileHandler,
    isSelected,
}) {
    const {
        isHover,
        setIsHover,
        isInputMode,
        setIsInputMode,
        newFileName,
        setNewFileName,
        fileRef,
        onInputHandler,
        onFileInputClick,
    } = useCustomListItemWrapper({ file, renameHandler })

    return (
        <CustomListItem
            {...{
                disableRipple: true,
                key: file.id,
                button: true,
                onClick: (e) => selectFileHandler(file, e),
                onMouseMove: () => setIsHover(true),
                onMouseLeave: () => setIsHover(false),
                // for css
                isSelected,
            }}
        >
            <CustomListItemIcon>
                <RiJavascriptFill size={20} fill="yellow" />
            </CustomListItemIcon>

            <ContentEditableFileName
                {...{
                    ref: fileRef,
                    contentEditable: isInputMode,
                    onClick: (e) => {
                        e.stopPropagation()
                        setIsInputMode(true)
                    },
                    onInput: onInputHandler,
                }}
            >
                {newFileName}
            </ContentEditableFileName>

            {isHover && (
                <DeleteButtonContainer
                    {...{ onClick: (e) => deleteHandler(file) }}
                >
                    <MdDelete
                        {...{
                            size: 12,
                            title: 'Delete file',
                        }}
                    />
                </DeleteButtonContainer>
            )}
        </CustomListItem>
    )
}

export const CustomListItemIcon = styled('div')({
    marginRight: '8px',
    display: 'flex',
})

export const CustomListItem = styled(ListItem)(({ isSelected }) => ({
    fontFamily: 'Noto Sans',
    fontSize: '12px',
    minWidth: '200px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '8px',
    paddingTop: '8px',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '8px',
    borderRadius: '4px',
    backgroundColor: isSelected ? '#3c3c3c' : 'transparent',
    '&:hover': {
        backgroundColor: '#3c3c3c',
    },
    '&:active': {
        backgroundColor: 'none',
    },
}))
