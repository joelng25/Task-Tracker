import json, os, socket, subprocess, tempfile, time, unittest
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError
BIN = os.environ.get('TASK_SERVER_BIN', str(Path(__file__).parent / 'task-server'))
class API(unittest.TestCase):
 def setUp(self):
  self.tmp=tempfile.TemporaryDirectory(); self.file=Path(self.tmp.name,'tasks.json')
  with socket.socket() as s: s.bind(('127.0.0.1',0)); self.port=s.getsockname()[1]
  self.proc=subprocess.Popen([BIN],env={**os.environ,'HOST':'127.0.0.1','PORT':str(self.port),'TASKS_FILE':str(self.file)},stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
  for _ in range(100):
   try: self.request('GET'); break
   except URLError: time.sleep(.03)
  else: self.fail('API did not start')
 def tearDown(self):
  self.proc.terminate(); self.proc.wait(timeout=5); self.tmp.cleanup()
 def request(self,method,path='',body=None):
  r=Request(f'http://127.0.0.1:{self.port}/api/tasks'+path,data=json.dumps(body).encode() if body is not None else None,method=method,headers={'Content-Type':'application/json'})
  try:
   with urlopen(r,timeout=3) as out:return out.status,json.load(out)
  except HTTPError as e:return e.code,json.load(e)
 def test_create_states_delete(self):
  status,row=self.request('POST',body={'description':'real task'});self.assertEqual(status,201);id=row['data']['id']
  for state in ['in-progress','done','todo']:
   self.assertEqual(self.request('PUT',f'/{id}',{'status':state})[0],200)
   self.assertEqual(self.request('GET')[1]['data'][0]['status'],state)
  self.assertEqual(self.request('DELETE',f'/{id}')[0],200);self.assertEqual(self.request('GET')[1]['data'],[])
 def test_huge_id_does_not_crash(self):
  for method in ['PUT','DELETE']:
   self.assertEqual(self.request(method,'/999999999999999999999999',{'status':'done'} if method=='PUT' else None)[0],400)
  self.assertEqual(self.request('GET')[0],200)
 def test_failed_save_rolls_back(self):
  self.request('POST',body={'description':'keep'})
  old=self.file.read_bytes(); Path(str(self.file)+'.tmp').mkdir()
  self.assertEqual(self.request('POST',body={'description':'discard'})[0],500)
  self.assertEqual(self.file.read_bytes(),old);self.assertEqual(len(self.request('GET')[1]['data']),1)
if __name__=='__main__':unittest.main()
