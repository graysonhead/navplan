from flask import Flask

app = Flask(__name__,
            template_folder='../npclient/public',
            static_folder='../npclient/public',
            static_url_path='/static')


from npserver import views