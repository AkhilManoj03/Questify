import http.server
import socketserver
import mysql.connector as mysql
import json

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/~24SP_manoja2/users':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()

            db = mysql.connect(
                host="cmsc508.com",
                user="24SP_manoja2",
                password="V00978659",
                database="24SP_manoja2_pr"
            )
            
            mycursor = db.cursor()

            mycursor.execute("SELECT * FROM users")

            myresult = mycursor.fetchall()

            users = [{'email_address': row[0], 'university': row[1], 'first_name': row[2], 'last_name': row[3]} for row in myresult]

            self.wfile.write(json.dumps(users).encode())
        else:
            super().do_GET()

def run(server_class=socketserver.TCPServer, handler_class=MyHTTPRequestHandler):
    server_address = ('', 8001)
    httpd = server_class(server_address, handler_class)
    host, port = httpd.server_address
    print("Server running at http://{}:{}".format(host, port))
    httpd.serve_forever()

if __name__ == "__main__":
    run()
