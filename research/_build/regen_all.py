import json,glob,statistics,subprocess,os
S=os.path.dirname(os.path.abspath(__file__))+'/'
os.chdir('/home/user/Recipes')
subprocess.check_call(['python3',S+'gen_prices.py'])
if os.path.exists(S+'level_check.json'): os.remove(S+'level_check.json')
subprocess.check_call(['python3',S+'gen_markets.py'])
M=json.load(open('research/markets.json'))
P=json.loads(subprocess.check_output(['node','-e',"global.window={};['prices','prices-more','prices-extra'].forEach(f=>require('./js/data/'+f+'.js'));console.log(JSON.stringify(window.PRICES))"]))
res={}
for f in sorted(glob.glob('research/prices/*.json')):
    d=json.load(open(f));cc=d['country'];m=M[cc];rs=[]
    for r in d['items']:
        p=P.get(r['id'])
        if not p: continue
        if (p['u'] in('g','ml'))!=(r['unit'] in('g','ml')): continue
        if r['unit']=='pc' and p['u']!='pc': continue
        rs.append((r['price']/m['rate']/r['qty'])/(p['p']/p['q']*m['level']*m['cat'].get(p['c'],1)))
    res[cc]=[len(rs),statistics.median(rs) if rs else None]
base=res['DE'][1]
json.dump({cc:[n,(r/base if r else None)] for cc,(n,r) in res.items()},open(S+'level_check.json','w'))
subprocess.check_call(['python3',S+'gen_markets.py'])
[json.load(open(f)) for f in glob.glob('research/**/*.json',recursive=True)]
print("ok, DE base", round(base,3))
