module.exports = {
      get_lp_quote_dict(quotes={'bid' : [], 'ofr' : []}){
          var lp_quotes = {};
          var bid_lps = [];
          var ofr_lps = [];
          var bid_prices = [];
          var ofr_prices = [];
          for(var item of quotes.bid){
              bid_lps.push(item.lp);
              bid_prices.push(item.price);
          };
          for(var item of quotes.ofr){
              ofr_lps.push(item.lp);
              ofr_prices.push(item.price);
          };
          var lps = [].concat(bid_lps).concat(ofr_lps);
          lps.sort();
          for (var lp of lps){
            var lp_quote = {};
            lp_quotes[lp] = lp_quote;
          };
          for(var side of ['bid' , 'ofr']){
              for(var side_quote of quotes[side]){
                lp_quotes[side_quote.lp][side + "_price"] = side_quote.price;
                lp_quotes[side_quote.lp][side + "_size"] = side_quote.size;
                lp_quotes[side_quote.lp][side + "_time"] = side_quote.time;
              }
          };
          return lp_quotes;
        }
}
