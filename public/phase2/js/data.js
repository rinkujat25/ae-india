/* Illustrative design data only. Replace this adapter with Wingback APIs later. */
window.GV = window.GV || {};
GV.data = {
 people: [
  {id:'priya',name:'Priya Sharma',role:'Product Designer',department:'Design',color:'lavender'},
  {id:'rohan',name:'Rohan Kapoor',role:'Frontend Engineer',department:'Engineering',color:'peach'},
  {id:'ananya',name:'Ananya Iyer',role:'People Partner',department:'People & Culture',color:'mint'},
  {id:'arjun',name:'Arjun Nair',role:'Product Manager',department:'Product',color:'sky'},
  {id:'sneha',name:'Sneha Patel',role:'Marketing Lead',department:'Marketing',color:'rose'},
  {id:'vikram',name:'Vikram Singh',role:'Engineering Lead',department:'Engineering',color:'sand'}
 ],
 products:[
  {id:'headphones',name:'Wireless over-ear headphones',brand:'Everyday essentials',points:1800,category:'Electronics',image:'assets/product-headphones.png',tag:'Team favourite',description:'Your focus time, upgraded. Comfortable over-ear headphones for playlists, calls and everything in between.'},
  {id:'backpack',name:'The everyday laptop backpack',brand:'Work & travel',points:1200,category:'Lifestyle',image:'assets/product-backpack.png',tag:'Bestseller',description:'A thoughtfully designed daily carry with space for your laptop and all the little essentials.'},
  {id:'coffee',name:'Pour-over coffee set',brand:'Slow mornings',points:850,category:'Home & living',image:'assets/product-pour-over.png',tag:'Under 1,000 pts',description:'Make a little more time for your morning ritual with a beautiful pour-over coffee set.'},
  {id:'headphones-pro',name:'Studio wireless headphones',brand:'Workday collection',points:3200,category:'Electronics',image:'assets/product-headphones.png',tag:'Premium pick',description:'A premium sound companion for creative work, relaxing evenings and your daily commute.'},
  {id:'weekender',name:'The commuter essentials bag',brand:'On the move',points:2100,category:'Lifestyle',image:'assets/product-backpack.png',tag:'New arrival',description:'Organised storage and a versatile silhouette for workdays and weekend plans.'},
  {id:'coffee-duo',name:'Coffee lovers gift set',brand:'Made for moments',points:1600,category:'Home & living',image:'assets/product-pour-over.png',tag:'Thoughtful choice',description:'A simple, satisfying ritual to start every day. A gift for anyone who appreciates a great brew.'}
 ],
 feed:[
  {id:'f1',sender:'Arjun Nair',person:'Priya Sharma',initials:'PS',department:'Product & Design',date:'2 hours ago',value:'Better together',title:'Great things happen together.',message:'A huge thank you to Priya for going the extra mile on our new onboarding experience. Your thoughtful designs and collaborative spirit made all the difference. So glad to have you on the team!',points:100,likes:24,comments:[{name:'Rohan Kapoor',message:'So well deserved, Priya!'}],theme:'together'},
  {id:'f2',sender:'Sneha Patel',person:'Rohan Kapoor',department:'Engineering',date:'4 hours ago',value:'Make it happen',title:'Above. Beyond. And then some.',message:'From the first idea to the final launch, you made every detail count. Thank you for helping us deliver a smooth experience for our customers!',points:50,likes:18,comments:[],theme:'beyond'},
  {id:'f3',sender:'Ananya Iyer',person:'Vikram Singh',department:'Engineering',date:'Yesterday',value:'Lead with care',title:'You make a difference.',message:'Thank you for taking the time to mentor our newest team members. Your patience and encouragement help everyone feel like they belong.',points:50,likes:32,comments:[],theme:'care'}
 ],
 transactions:[
  {date:'2026-09-24',title:'Above & beyond award',type:'earned',program:'Everyday Wins',amount:100,balance:2450},
  {date:'2026-09-21',title:'Coffee set redemption',type:'redeemed',program:'Rewards store',amount:-850,balance:2350},
  {date:'2026-09-18',title:'Better together recognition',type:'earned',program:'Everyday Wins',amount:50,balance:3200},
  {date:'2026-09-12',title:'3-year work anniversary',type:'earned',program:'Milestones',amount:1000,balance:3150},
  {date:'2026-09-08',title:'Customer champion award',type:'earned',program:'Everyday Wins',amount:100,balance:2150},
  {date:'2026-08-28',title:'Laptop backpack redemption',type:'redeemed',program:'Rewards store',amount:-1200,balance:2050},
  {date:'2026-08-22',title:'Innovation spotlight',type:'earned',program:'Quarterly Awards',amount:250,balance:3250}
 ],
 orders:[
  {id:'GV-260921',date:'2026-09-21',name:'Pour-over coffee set',points:850,status:'Shipped',image:'assets/product-pour-over.png'},
  {id:'GV-260828',date:'2026-08-28',name:'The everyday laptop backpack',points:1200,status:'Delivered',image:'assets/product-backpack.png'},
  {id:'GV-260715',date:'2026-07-15',name:'Wireless over-ear headphones',points:1800,status:'Delivered',image:'assets/product-headphones.png'}
 ],
 history:[
  {id:'h1',date:'2026-09-24',title:'Above & beyond',person:'Arjun Nair',direction:'received',points:100,value:'Make it happen',message:'Thank you for going the extra mile with the onboarding launch. Your work made a real difference.'},
  {id:'h2',date:'2026-09-22',title:'Great things happen together',person:'Priya Sharma',direction:'sent',points:50,value:'Better together',message:'Your attention to detail and thoughtful feedback helped us build something we are all proud of.'},
  {id:'h3',date:'2026-09-18',title:'Better together',person:'Rohan Kapoor',direction:'received',points:50,value:'Better together',message:'I appreciate your help bringing the new product experience to life. Thank you for being such a great teammate.'},
  {id:'h4',date:'2026-09-16',title:'Quarterly star nomination',person:'Ananya Iyer',direction:'pending',points:250,value:'Lead with care',message:'Ananya has helped our team feel supported and included through every step of our growth.'},
  {id:'h5',date:'2026-09-14',title:'Launch team appreciation',person:'Product & Engineering',direction:'group',points:100,value:'Make it happen',message:'Thank you to everyone who made this launch possible. It was a true team effort.'},
  {id:'h6',date:'2026-09-08',title:'Customer champion',person:'Sneha Patel',direction:'received',points:100,value:'Customer first',message:'Your research brought our customers into the conversation and made the product stronger.'}
 ],
 tasks:[
  {id:'t1',title:'Share your monthly pulse',description:'A quick check-in. Help us understand how your month is going.',category:'Team pulse',due:'Due 30 Sep',icon:'bar-chart',action:'Take survey',kind:'survey',complete:false},
  {id:'t2',title:'Celebrate your September teammate',description:'Recognise someone who made your workday a little better.',category:'Recognition',due:'Due 30 Sep',icon:'heart',action:'Appreciate',kind:'recognition',complete:false},
  {id:'t3',title:'Complete your profile',description:'Add a little about yourself so your team can get to know you.',category:'Getting started',due:'Completed 18 Sep',icon:'person',action:'View profile',kind:'profile',complete:true}
 ]
};
