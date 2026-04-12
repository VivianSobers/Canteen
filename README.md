#            Financial Portfolio


**Team Number : 11**

## **Team Members:**

 - Varun Kumar H L: PES2UG24AM231
 - Vikhyath Bharadwaj K S: PES2UG24CS586
 - Yashaswini B: PES2UG24EC130
 - Vivian Sobers E: PES2UG24CS600

## **To run software**: 
```console
gcc data.h input.c total.c credit_debit.c expenses.c income.c tax.c advice.c  
```
## **Brief Outline of modules**: 
 - advice.c - Gives advice based on expenses and income of the user for the year.
 - credit_debit.c - Creates 2 separate csv files, one with credit info and one with debit info.
 - expenses.c - Gives a consolidated debit report via categorising.
 - income.c - Gives a consolidated credit report via categorising.
 - input.c - Take info from the csv file and put it into a structure.
 - tax.c - Gives you the income tax returns after exemptions and deductions .
 - total.c - Places function call to all modules.
