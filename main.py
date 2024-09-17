import requests
from bs4 import BeautifulSoup
import json

def scrape_and_extract(url, keywords):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Trouver toutes les balises
    tags = soup.find_all(True)
    
    filtered_tags = []

    for tag in tags:
        if any(keyword in tag.get_text() for keyword in keywords):
            nbr_occurence_per_tag_per_keywords = {keyword: (tag.get_text()).count(keyword) for keyword in keywords}
            filtered_tags.append({
                'tag': tag.name,
                'text': tag.get_text(),
                'nbr_occurence_per_tag_per_keywords': nbr_occurence_per_tag_per_keywords,
            })

            

    # retour JSON
    json_result = json.dumps(filtered_tags, ensure_ascii=False, indent=4)
    
    return json_result

# définir URL / mots clés choisis
url = 'https://www.usine-digitale.fr/article/quantique-pasqal-passe-la-barre-des-1000-atomes-pieges.N2215088'
keywords = ['atomes', 'résultats', "quantique"]
result = scrape_and_extract(url, keywords)

with open('result.json', 'w', encoding='utf-8') as f:
    f.write(result)
