# Zadanie rekrutacyjne Sealcode

Napisz aplikację webową do generowania miniaturek zdjęć.

## Opis działania:

Użytkownik uploaduje zdjęcie za pomocą formularza. Klika "generuj
miniaturki", po czym widzi linki do pobrania trzech wersji zdjęcia: o
szerokości 100px, 200px i 400px, skalowanych z zachowaniem proporcji.

## Wymagania:

1. Skalowanie zdjęć ma się odbywać po stronie serwera (najlepiej za pomocą biblioteki `sharp`)

2. Front-end powinien być pozbawiony JS. Korzystamy ze zwykłych formularzy HTML.

3. Nie jest wymagane skorzystanie z bazy danych. Ze spokojem można skorzystać po
   prostu z plików na dysku.

4. Strona nie musi być pięknie ozdobiona, może być dosyć surowa. Musi za to
   prawidłowo się wyświetlać i być równie wygodna w użyciu zarówno na
   urządzeniu mobilnym, jak i na desktopie

5. Nie używaj żadnego frameworka CSS (np. bootstrap)

6. Użytkownik powinien móc pobrać tylko te pliki, które właśnie wysłał. Inni
   użytkownicy nie powinni móc pobrać miniaturek zdjęć, których sami nie wysłali.
