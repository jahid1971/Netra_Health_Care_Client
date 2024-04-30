import * as React from 'react';
import { Menu, MenuItem, Checkbox, ListItemText, FormControl, InputLabel, Select, SelectChangeEvent } from '@mui/material';

interface CustomFilterProps {
    anchorEl: null | HTMLElement;
    onClose: () => void;
    onApply: (values: string[]) => void;
    selectedValues: string[];
}

const CustomFilterUI: React.FC<CustomFilterProps> = ({ anchorEl, onClose, onApply, selectedValues }) => {
    const handleChange = (event: SelectChangeEvent<string[]>) => {
        onApply(event.target.value as string[]);
    };

    return (
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={onClose}
        >
            <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                    multiple
                    value={selectedValues}
                    onChange={handleChange}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {['Male', 'Female', 'Transgender'].map(option => (
                        <MenuItem key={option} value={option}>
                            <Checkbox checked={selectedValues.includes(option)} />
                            <ListItemText primary={option} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Menu>
    );
};

export default CustomFilterUI;
