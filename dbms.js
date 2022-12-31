const { Client } = require('pg');
const scanf = require('scanf');

const client = new Client({
    host: "localhost",
    user: "postgres",
    password: "admin",
    database: "S2_T6_vaccine_drive_management"
})
client.connect();

console.log("\n1: New Registration");
console.log("2: View Registration details");
console.log("3: Update Registration Details");
console.log("4: Delete Registration");


console.log("\nSelect your choice to proceed: ")
var c = scanf("%d");
console.log("Your query %d is being processed...", c);

switch (c) {
    case 1:
    {
        client.query('set search_path to t6_vc_mn')
        client.query("INSERT INTO t6_vc_mn.user(u_id, u_name, u_age, u_gender, u_address, u_phone_number, u_guardian) VALUES('87','Kavya','20','F','ahmedabad','9585849844','Kavya')",(err,result) =>   
        {   
            if(!err)
            {
                console.log("\nNew row is successfully Inserted in User's table\n")
            }
            else
                console.log("Error in Inserting\n")
        })
        
        client.query('set search_path to t6_vc_mn')
        client.query("INSERT INTO t6_vc_mn.registration_details( reg_id, u_id, slot_id, date, vaccine_name, reg_mode, c_id, dose, reg_date, reg_time) VALUES('116','87','1','2021-07-29','varivax','online','1','1','2021-07-28','20:15:00')",(err,result)=>
        {   
            if(!err)
            {
                console.log("New row is successfully Inserted in Registration details table\n")
            }
            else
                console.log("Error in Inserting\n")
        })
        break;
    }

    case 2:
    {
        console.log("Enter Registration ID: ");
        var regis=scanf("%d");

        client.query('set search_path to t6_vc_mn');
        client.query("select * from registration_details where reg_id=$1",[regis],(err,result) =>   
        {   
            if(!err)
            {
                console.log("\nGiven below are your registration details\n")
                console.log(result.rows);
            }
            else
                console.log("Error in displaying\n")
        })
        
        break;
    }

    case 3:
    {
        client.query('set search_path to t6_vc_mn');
        client.query("UPDATE t6_vc_mn.registration_details SET slot_id='2', c_id='3' WHERE reg_id='116';",(err,result) =>   
            {   
                if(!err)
                {
                    console.log("Data updated successfully\n")
                }
                else
                    console.log("Error in updating\n")
                   client.end();
            })
            break;
    }

    case 4:
    {
        client.query('set search_path to t6_vc_mn');
        client.query("Delete from registration_details where reg_id='116'",(err,result) =>   
        {   
            if(!err)
            {
                console.log("The registration is successfully deleted\n")
            }
            else
                console.log("Error in Deleting\n")
                client.end();
        })
            break;
    }

    default:
    {
        client.query('set search_path to t6_vc_mn')
        console.log("Enter the city: ");
        var city=scanf("%s");
        client.query("select c_id,c_name,c_type,vaccine_price from vaccination_center where c_address=$1",[city],(err,result) =>   
        {    
            if(!err)
            {
                console.log("\nThe centres in the given city are: \n")
                console.log(result.rows);
            }
            else
                console.log("Error in displaying\n")
        })
        break;
    }
    client.end();
    }

    