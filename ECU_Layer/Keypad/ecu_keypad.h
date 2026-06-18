/* 
 * File:   ecu_keypad.h
 * Author: Abdo Halem
 *
 * Created on August 31, 2023, 1:06 PM
 */

#ifndef ECU_KEYPAD_H
#define	ECU_KEYPAD_H

/* Section: Includes*/
#include "../../MCAL_Layer/GPIO/hal_gpio.h"

/* Section: Macro Declarations*/
#define KEYPAD_ROWS    4
#define KEYPAD_COLUMNS 4

/* Section: Macro Function Declarations*/

/* Section: Data Type Declarations*/
typedef struct{
    pin_config_t rows[KEYPAD_ROWS];
    pin_config_t columns[KEYPAD_COLUMNS];
}keypad_t;

/* Section: Software Interfaces Declarations*/
Std_Return_Type keypad_initialize(const keypad_t *keypad);
Std_Return_Type keypad_get_button(const keypad_t *keypad, uint8 *value);

#endif	/* ECU_KEYPAD_H */

