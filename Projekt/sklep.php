<?php
$conn = mysqli_connect("localhost", "root", "", "sklep");
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['full_name']) && isset($_POST['country']) && isset($_POST['postal_code']) && isset($_POST['address']) && isset($_POST['telephone']) && isset($_POST['cart'])) {
        $uzytkownik = $_POST['full_name'];
        $kraj = $_POST['country'];
        $kod_pocztowy = $_POST['postal_code'];
        $adres = $_POST['address'];
        $telefon = $_POST['telephone'];
        $zamowienie = $_POST['cart'];

        $query = "INSERT INTO zamowienia (Uzytkownik, Kraj, Kod_pocztowy, Adres, Telefon, Zamowienie) VALUES ('$uzytkownik', '$kraj', '$kod_pocztowy', '$adres', '$telefon', '$zamowienie')";
        
        if (mysqli_query($conn, $query) === TRUE) {
            echo "<script>alert('Zamówienie złożone pomyślnie');</script>";
            header("Location: " . $_SERVER['PHP_SELF']);
            exit();
        } else {
            echo "Error: " . $conn->error;
        }
    }
}
mysqli_close($conn);
?>
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sklep Wędkarski</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <header>
        <h1>Sklep Wędkarski</h1>
        <nav>
            <ul>
                <li><a href="#">Strona Główna</a></li>
                <li><a href="#nowosci">Nowości</a></li>
                <li><a href="#opinie">Opinie</a></li>
                <li><a href="#o-nas">O Nas</a></li>
                <li class="cart"><a href="#cart" id="cart-icon">Koszyk (<span id="cart-count">0</span>)</a></li>
            </ul>
        </nav>
        
        <div id="game-popup" class="popup">
            <div class="popup-content">
                <span class="close-btn">&times;</span>
                <h2>Old Man Consequences - Minigra</h2>
                <iframe id="game-frame" src="game.html"></iframe>
                <button id="closeGame" style="
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: white;
                    color: black;
                    font-size: 16px;
                    padding: 10px;
                    border: none;
                    cursor: pointer;
                ">❌ Zamknij grę</button>
            </div>
        </div>
    </header>

    <main>
        <section class="products">
            <h2>Nasze Produkty</h2>
            <div class="product-categories">
                <div class="category" id="wedki">
                    <h3>Wędki</h3>
                    <div class="product-list"></div>
                </div>
                <div class="category" id="plecionki">
                    <h3>Plecionki</h3>
                    <div class="product-list"></div>
                </div>
                <div class="category" id="kolowrotki">
                    <h3>Kołowrotki</h3>
                    <div class="product-list"></div>
                </div>
                <div class="category" id="odziez">
                    <h3>Odzież</h3>
                    <div class="product-list"></div>
                </div>
                <div class="category" id="zylki">
                    <h3>Żyłki</h3>
                    <div class="product-list"></div>
                </div>
                <div class="category" id="przynety">
                    <h3>Przynęty</h3>
                    <div class="product-list"></div>
                </div>
                <div class="category" id="haki">
                    <h3>Haki</h3>
                    <div class="product-list"></div>
                </div>
            </div>
            <?php
            $conn = mysqli_connect("localhost", "root", "", "sklep");
            $query = "SELECT * FROM asortyment";
            $result = mysqli_query($conn, $query);
            if (mysqli_num_rows($result) > 0) {
                while($row = mysqli_fetch_assoc($result)) {
                    $image = '';
                    $category = '';
                    switch ($row["Typ"]) {
                        case 'Wędka':
                            $image = 'images_site/fishing_rod.png';
                            $category = 'wedki';
                            break;
                        case 'Plecionka':
                            $image = 'images_site/fishing_braid.png';
                            $category = 'plecionki';
                            break;
                        case 'Kołowrotek':
                            $image = 'images_site/fishing_reel.png';
                            $category = 'kolowrotki';
                            break;
                        case 'Odzież':
                            if (strpos($row["Nazwa"], 'Kurtka') !== false) {
                                $image = 'images_site/fishing_clothing.png';
                            } else if (strpos($row["Nazwa"], 'Spodnie') !== false) {
                                $image = 'images_site/fishing_clothing2.png';
                            }
                            $category = 'odziez';
                            break;
                        case 'Żyłka':
                            $image = 'images_site/fishing_lane.png';
                            $category = 'zylki';
                            break;
                        case 'Przynęta':
                            if (strpos($row["Nazwa"], 'Worm') !== false) {
                                $image = 'images_site/worm_bait.png';
                            } else if (strpos($row["Nazwa"], 'Jerkbait') !== false) {
                                $image = 'images_site/fish_bait.png';
                            }
                            $category = 'przynety';
                            break;
                        case 'Hak':
                            $image = 'images_site/fishing_hook.png';
                            $category = 'haki';
                            break;
                        default:
                            $image = 'default.png';
                            $category = 'inne';
                            break;
                    }
                    echo '<div class="product" data-category="' . $category . '" data-description="' . $row["Opis"] . '">';
                    echo '<img src="' . $image . '" alt="' . $row["Nazwa"] . '">';
                    echo '<h3>' . $row["Nazwa"] . '</h3>';
                    echo '<p class="price" data-original-price="' . $row["Cena"] . '">' . $row["Cena"] . ' zł</p>';
                    echo '<input type="number" class="quantity-input" min="1" max="' . $row["Ilosc"] . '" value="1">';
                    echo '<button class="add-to-cart" data-name="' . $row["Nazwa"] . '" data-price="' . $row["Cena"] . '" data-available="' . $row["Ilosc"] . '">Dodaj do koszyka</button>';
                    echo '</div>';
                }
            } else {
                echo "Brak produktów.";
            }
            mysqli_close($conn);
            ?>
        </section>
        <section id="nowosci" class="news">
            <h2>Nowości w Sklepie</h2>
            <p>Właśnie dodaliśmy nowe wędki i zestawy dla początkujących! Sprawdź naszą ofertę.</p>
        </section>
        <section class="cart-section" id="cart">
            <h2>Twój Koszyk</h2>
            <ul id="cart-items"></ul>
            <p><strong>Łączna kwota: <span id="total-price">0.00</span> zł</strong></p>
            <p id="discount-info" style="color: red;"></p>
            <button id="clear-cart">Wyczyść Koszyk</button>
            <button id="place-order">Złóż Zamówienie</button>
        </section>
        <div id="order-popup" class="popup">
            <div class="popup-content">
                <span class="close-btn">&times;</span>
                <h2>Podsumowanie Zamówienia</h2>
                <ul id="order-summary"></ul>
                <form id="order-form" method="post">
                    <input type="text" name="full_name" placeholder="Imię i Nazwisko" required>
                    <input type="text" name="address" placeholder="Adres" required>
                    <input type="text" name="country" placeholder="Kraj" required>
                    <input type="text" name="postal_code" placeholder="Kod Pocztowy" required>
                    <input type="text" name="telephone" placeholder="Telefon" required>
                    <input type="hidden" name="cart" id="cart-data">
                    <button type="submit">Złóż Zamówienie</button>
                    <button type="button" id="continue-shopping">Kontynuuj Zakupy</button>
                </form>
            </div>
        </div>
        <section id="o-nas" class="about">
            <h2>O Nas</h2>
            <p>Jesteśmy pasjonatami wędkarstwa od ponad 20 lat. Oferujemy tylko sprawdzony sprzęt najwyższej jakości.</p>
        </section>
        <section id="opinie" class="reviews">
            <h2>Opinie Klientów</h2>
            <?php
            $conn = mysqli_connect("localhost", "root", "", "sklep");
            $sql = "SELECT * FROM opinie";
            $result = mysqli_query($conn, $sql);
            if ($result->num_rows > 0) {
                while($row = mysqli_fetch_assoc($result)) {
                    echo '<div class="review">';
                    echo '<p>' . $row["Opinia"] . '</p>';
                    echo '<p><strong>' . $row["Autor"] . '</strong></p>';
                    echo '</div>';
                }
            } else {
                echo "Brak opinii.";
            }
            mysqli_close($conn);
            ?>
        </section>
    </main>
    <footer>
        <p>&copy; 2025 Sklep Wędkarski. Wszelkie prawa zastrzeżone. <a href="#" id="play-game" style="text-decoration: none;">easteregg</a></p>
    </footer>
    <script src="script.js"></script>
</body>
</html>