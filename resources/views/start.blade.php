<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
        <link rel="stylesheet" href="{{asset('/css/app.css')}}">
    </head>
    <body class="profiler-bg ">
    <nav class="navbar is-transparent">
        <div class="navbar-brand">
            <a href="/" class="navbar-item subtitle is-size-3">
                <img src="{{asset('images/logo.png')}}" alt="Profiler">
            </a>
        </div>
    </nav>
    <section class="section hero  is-fullheight-with-navbar">
    <div class="hero-body">
        <div class="container has-text-centered">
            <div class="column is-4 is-offset-4">
                <div id="app">
                    <app></app>
                </div>
            </div>
        </div>
    </div>


    <span class="has-text-centered copyright"> &copy; <?=date('Y');?> Profiler </span>
    </section>
        <script src="{{asset('/js/app.js')}}"></script>
    </body>
</html>
