var func = "function(mylist){ mat = c();  function(mylist){ mat = c();  vars = \"x1 x2\";  i = 1; l = c();  len = length(mylist); for (i in 1:length(mylist)){   temp = deparse((mylist[[i]]));   l = c(l , temp); }  i=1; for (i in 1:length(l)){   if(i %% 2 == 0){     temp = l[i];     #split string by space     temp2 = unlist(strsplit(temp, \"[[:space:]]\"));j=1;vars = \"x1 x2\"; line = grep(\"^[-+]?[0-9]*\\.?[0-9]+\", temp2, perl=TRUE, value=TRUE);newval = c() for (x in 1:length(vars)){index = substring(vars[x],2)index = as.numeric(index)if (x == index ){newval = c(newval, line[x])}else{newval[index] = line[x]}}newval[length(vars)+1] = line[length(vars)+1];newval = as.numeric(newval)     linelen = length(newval);     newval[linelen] = newval[linelen]*-1;          if (i == 2){       mat = newval;     }else{       mat = rbind(mat, newval);     }   } } result = list (variables=c(vars),augcoeffmatrix=mat); return (result);} "