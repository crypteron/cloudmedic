using System;
using Microsoft.SqlServer.Management.Smo;
using Microsoft.SqlServer.Management.Common;
using System.IO;
using System.Data.SqlClient;
using CloudMedicApi.Utility;
using System.Collections.Generic;
using System.Data;

namespace CloudMedicApi.DAL
{
    public class DbSetup : System.Web.UI.Page
    {
        //helper method that returns a list of the tables in the database
        private static List<string> GetTables(string connectionString)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                DataTable schema = connection.GetSchema("Tables");
                List<string> TableNames = new List<string>();
                foreach (DataRow row in schema.Rows)
                {
                    TableNames.Add(row[2].ToString());
                }
                return TableNames;
            }
        }
        //checks to see if there are existing tables, returns True if there is not
        public static Boolean CheckForTables()
        {
            string connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["MyDbContext"].ConnectionString;
            return GetTables(connectionString).Count == 0;
        }
        //initializes the Database using a sql script
        public static void Page_Load()
        {
            string sqlConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["MyDbContext"].ConnectionString; 
            string pathToFile = "D:\\home\\site\\repository\\CloudMedicApi\\scripts\\script1.sql";
            string script = File.ReadAllText(pathToFile);

            SqlConnection conn = new SqlConnection(sqlConnectionString);

            Server server = new Server(new ServerConnection(conn));

            server.ConnectionContext.ExecuteNonQuery(script);
        }
    }
}