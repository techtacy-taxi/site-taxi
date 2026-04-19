$UserAgent = "Antigravity/1.0 (Contact: test@example.com)"

$ImagesToFetch = @(
    @{ Title = "File:OAS_Parthenon.jpg"; OutFile = "acropolis_hero.jpg"; Width = 1200 },
    @{ Title = "File:Acropolis_of_Athens_01361.JPG"; OutFile = "acropolis_gallery_1.jpg"; Width = 800 },
    @{ Title = "File:Plaka_Athens_2013.jpg"; OutFile = "acropolis_gallery_2.jpg"; Width = 800 },
    @{ Title = "File:Temple_of_Apollo_at_Delphi.jpg"; OutFile = "delphi_hero.jpg"; Width = 1200 },
    @{ Title = "File:Athenian_Treasury_in_Delphi.jpg"; OutFile = "delphi_gallery_1.jpg"; Width = 800 },
    @{ Title = "File:Arachova_view.jpg"; OutFile = "delphi_gallery_2.jpg"; Width = 800 },
    @{ Title = "File:Meteora_View_from_Grand_Meteoron.jpg"; OutFile = "meteora_hero.jpg"; Width = 1200 },
    @{ Title = "File:Meteora_-_Varlaam_Monastery_01.jpg"; OutFile = "meteora_gallery_1.jpg"; Width = 800 },
    @{ Title = "File:Rousanou_Monastery_Meteora_Greece.jpg"; OutFile = "meteora_gallery_2.jpg"; Width = 800 },
    @{ Title = "File:Lake_Vouliagmeni.jpg"; OutFile = "vouliagmeni_lake.jpg"; Width = 800 },
    @{ Title = "File:Treasury_of_Atreus_Front_View.jpg"; OutFile = "mycenae_tomb.jpg"; Width = 800 },
    @{ Title = "File:Lion_Gate_Mycenae.jpg"; OutFile = "mycenae_hero.jpg"; Width = 1200 },
    @{ Title = "File:Epidaurus_theater.jpg"; OutFile = "epidaurus.jpg"; Width = 800 }
)

foreach ($Img in $ImagesToFetch) {
    try {
        $encodedTitle = [uri]::EscapeDataString($Img.Title)
        $imgUrlApi = "https://en.wikipedia.org/w/api.php?action=query&titles=$encodedTitle&prop=imageinfo&iiprop=url&iiurlwidth=$($Img.Width)&format=json"
        
        $imgRes = Invoke-RestMethod -Uri $imgUrlApi -UserAgent $UserAgent -ErrorAction Stop
        
        $pages = $imgRes.query.pages
        $pageId = ($pages.PSObject.Properties | Where-Object Name -notmatch "^\-").Name[0]
        
        if ($pageId) {
            $imageUrl = $pages.$pageId.imageinfo[0].thumburl
            if (-not $imageUrl) {
                $imageUrl = $pages.$pageId.imageinfo[0].url
            }
            
            if ($imageUrl) {
                Write-Host "Downloading $($Img.OutFile) from $imageUrl"
                Invoke-WebRequest -Uri $imageUrl -OutFile "images\$($Img.OutFile)" -UserAgent $UserAgent -ErrorAction Stop
            } else {
                Write-Host "Could not find URL for $($Img.Title)"
            }
        }
    } catch {
        Write-Host "Error fetching $($Img.Title): $_"
    }
}
Write-Host "Done"
