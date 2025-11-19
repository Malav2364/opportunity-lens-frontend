import { Trophy, Medal, User as UserIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Leaderboard({ data }) {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <CardTitle className="text-lg">Leaderboard</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.length === 0 ? (
            <div className="text-center text-muted-foreground py-4">
              No scores yet. Be the first!
            </div>
          ) : (
            data.map((user, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 text-center font-bold text-muted-foreground">
                    {index === 0 ? (
                      <Medal className="w-5 h-5 text-yellow-500 mx-auto" />
                    ) : index === 1 ? (
                      <Medal className="w-5 h-5 text-gray-400 mx-auto" />
                    ) : index === 2 ? (
                      <Medal className="w-5 h-5 text-amber-600 mx-auto" />
                    ) : (
                      `#${index + 1}`
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <UserIcon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium text-sm">{user.name || "Anonymous"}</span>
                  </div>
                </div>
                <div className="font-bold text-sm">
                  {user.averageScore}%
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
