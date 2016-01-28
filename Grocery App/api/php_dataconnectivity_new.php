<?php
$servername = "localhost";
$username   = "root";
$password   = "test";
$dbname     = "grocery_db";
$method     = $_SERVER['REQUEST_METHOD'];
if ($method == 'GET') {
    if (isset($_GET['operation']) && ($_GET['operation'] === "login")) {
        
        if (isset($_GET['user_name']) && isset($_GET['password'])) {
            $user_name     = $_GET['user_name'];
            $password_user = $_GET['password'];
            
            $conn = new mysqli($servername, $username, $password, $dbname);
            // Check connection
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }
            $sql = "SELECT * FROM user_details where username = '$user_name' and password= '$password_user'";
            
            $result = $conn->query($sql);
            if ($result->num_rows > 0) {
                // output data of each row
                while ($row = $result->fetch_assoc()) {
                    $array[] = $row;
                }
                echo json_encode($array);
            } else {
                echo json_encode(array(
                    'users' => null
                ));
            }
            $conn->close();
        } else {
            echo ("error-No POST values--2");
        }
        
    } else if (isset($_GET['operation']) && ($_GET['operation'] === "search")) {
        
        if (isset($_GET['user_name'])) {
            $user_name = $_GET['user_name'];
            
            
            $conn = new mysqli($servername, $username, $password, $dbname);
            // Check connection
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }
            $sql = "SELECT DISTINCT * FROM user_details where username = '$user_name'";
            
            $result = $conn->query($sql);
            if ($result->num_rows > 0) {
                // output data of each row
                while ($row = $result->fetch_assoc()) {
                    $array[] = $row;
                }
                echo json_encode($array);
            } else {
                echo json_encode(
                    $result
                );
            }
            $conn->close();
        } else {
            echo ("error-No POST values--2");
        }
        
    } else {
        if (isset($_GET['product_name']) && isset($_GET['zip_code']) && isset($_GET['store_name'])) {
            $prd_name   = $_GET['product_name'];
            $zip_code   = $_GET['zip_code'];
            $store_name = $_GET['store_name'];
            
            // Create connection
            $conn = new mysqli($servername, $username, $password, $dbname);
            // Check connection
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }
            if ($store_name == "all")
                $sql = "SELECT * FROM product_table where product_name = '$prd_name' and zip_code= '$zip_code' order by price";
            else
                $sql = "SELECT * FROM product_table where product_name = '$prd_name' and zip_code= '$zip_code' and store_name= '$store_name' order by price";
            $result = $conn->query($sql);
            
            if ($result->num_rows > 0) {
                // output data of each row
                while ($row = $result->fetch_assoc()) {
                    $array[] = $row;
                }
                echo json_encode($array);
            }
            $conn->close();
        } else {
            echo ("error-No POST values--3");
        }
    }
}
else if($method == 'POST'){
if (isset($_POST['operation']) && ($_POST['operation'] === "insert")) {
    
    if (isset($_POST['user_name']) && isset($_POST['password'])) {
        $username_insert = $_POST['user_name'];
        $password_insert = $_POST['password'];
        $conn            = new mysqli($servername, $username, $password, $dbname);
        
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        
        $sql = "INSERT INTO user_details (username, password)
                VALUES ('$username_insert', '$password_insert')";
        
        $result = $conn->query($sql);
        if ($result) {
            echo json_encode(array(
                'users' => $result
            ));
            
        } else {
            echo "Failed";
        }
    } else {
        echo ("error-No POST values---1");
    }
}
if (isset($_POST['operation']) && ($_POST['operation'] === "save")) {
    
    if (isset($_POST['user_name']) && isset($_POST['password'])) {
        $username_insert = $_POST['user_name'];
        $password_insert = $_POST['password'];
        $product         = $_POST['prd_name'];
        $store           = $_POST['store'];
        $zip             = $_POST['zip'];
        $conn            = new mysqli($servername, $username, $password, $dbname);
        
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        
        $sql = "INSERT INTO user_details (username, password, zipcode, product_name, store_name)
                VALUES ('$username_insert', '$password_insert','$zip','$product','$store')";
        
        $result = $conn->query($sql);
        if ($result) {
            echo json_encode(array(
                'users' => $result
            ));
            
        } else {
            echo "Failed";
        }
    } else {
        echo ("error-No POST values");
    }
}

}

?>  