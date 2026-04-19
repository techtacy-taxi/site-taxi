import urllib.request
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

req1 = urllib.request.Request('https://upload.wikimedia.org/wikipedia/commons/e/e4/Lake_Vouliagmeni.jpg', headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req1, context=ctx) as response, open('images/vouliagmeni_lake.jpg', 'wb') as out_file:
    out_file.write(response.read())

req2 = urllib.request.Request('https://upload.wikimedia.org/wikipedia/commons/f/fb/Yellow_van.jpg', headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req2, context=ctx) as response, open('images/yellow_taxi_van.jpg', 'wb') as out_file:
        out_file.write(response.read())
except Exception as e:
    # fallback to another yellow van
    req3 = urllib.request.Request('https://upload.wikimedia.org/wikipedia/commons/1/1a/Ford_Transit_Custom_V362.jpg', headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req3, context=ctx) as response, open('images/yellow_taxi_van.jpg', 'wb') as out_file:
        out_file.write(response.read())

print("Downloaded.")
