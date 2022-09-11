<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Favourite addition mail</title>
</head>

<body>
    <h1>Favourite addition notice</h1>
    <p>
        Dear {{ $mailData['name'] }}, <br>
        We are sending this mail as you liked the movie "{{ $mailData['movieName'] }}" from
        our collection. <br>
        You can unlike the movie anytime you want from our site.<br>
        With regards.
    </p>
</body>

</html>
