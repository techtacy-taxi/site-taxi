$UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"

$Downloads = @(
    @{ Name="acropolis_hero.jpg"; Wiki="Parthenon_from_west.jpg"; Width=1200 },
    @{ Name="acropolis_gallery_1.jpg"; Wiki="Acropolis_of_Athens_01361.JPG"; Width=800 },
    @{ Name="acropolis_gallery_2.jpg"; Wiki="Plaka_Athens_2013.jpg"; Width=800 },
    
    @{ Name="delphi_hero.jpg"; Wiki="Sanctuary_of_Athena_Pronaia.jpg"; Width=1200 },
    @{ Name="delphi_gallery_1.jpg"; Wiki="Athenian_Treasury_in_Delphi.jpg"; Width=800 },
    @{ Name="delphi_gallery_2.jpg"; Wiki="Arachova.jpg"; Width=800 },
    
    @{ Name="meteora_hero.jpg"; Wiki="Meteora_Greece.jpg"; Width=1200 },
    @{ Name="meteora_gallery_1.jpg"; Wiki="Meteora_panorama.jpg"; Width=800 },
    @{ Name="meteora_gallery_2.jpg"; Wiki="Rousanou_Monastery_Meteora_Greece.jpg"; Width=800 },
    
    @{ Name="mycenae_hero.jpg"; Wiki="Lion_Gate_Mycenae.jpg"; Width=1200 },
    @{ Name="mycenae_gallery_1.jpg"; Wiki="Epidaurus_theater.jpg"; Width=800 },
    @{ Name="mycenae_gallery_2.jpg"; Wiki="Treasury_of_Atreus_Front_View.jpg"; Width=800 },

    @{ Name="vouliagmeni_lake.jpg"; Wiki="Lake_Vouliagmeni.jpg"; Width=800 }
)

foreach ($item in $Downloads) {
    Try {
        $encoded = [uri]::EscapeDataString($item.Wiki)
        $url = "https://commons.wikimedia.org/wiki/Special:FilePath/$encoded?width=$($item.Width)"
        Write-Host "Downloading $($item.Name) from $url"
        & curl.exe -L -s $url -H "User-Agent: $UserAgent" -o "images\$($item.Name)"
    } Catch {
        Write-Host "Failed $($item.Name)"
    }
}
Write-Host "All downloads complete."
