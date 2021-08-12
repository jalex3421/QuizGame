<!-- Author: Alejandro Meza Tudela
     Purpose: Obtain data from the game and show ranking of users -->
<?php
    //1.Catch the variables
    $username = $_POST['name'];
    $score = $_POST['number_input'];
    //catch all the HTML file
    $chain = file_get_contents("ranking.html");


    //2.Create connection with MongoDB
    $manager = new MongoDB\Driver\Manager("mongodb://localhost:27017");

    //3.Update object in database
    $bulk = new MongoDB\Driver\BulkWrite;
    //update fields
    $bulk->update(
    ['username' => $username],
    ['$set' => ['score' => $score]]
    );
    $manager =new MongoDB\Driver\Manager("mongodb://localhost:27017");
    $result = $manager->executeBulkWrite('Trivia.Usernames', $bulk);
    //echo $result;

    //4.Obtain all the players in database
    $filter = [];
    $query = new MongoDB\Driver\Query([]);
    //pointer to all objects from the collection
    $cursor = $manager->executeQuery("Trivia.Usernames", $query);
    $cursor = $cursor->toArray();

    $parts = explode("##rows##", $chain);
    $body = "";
    $aux = "";

    foreach($cursor as $document) {
        $aux = $parts[1];
        $aux = str_replace("##username##", $document->username, $aux);
        $aux = str_replace("##score##", $document->score, $aux);
        $body .= $aux;
    }
    echo $parts[0].$body.$parts[2];



?>